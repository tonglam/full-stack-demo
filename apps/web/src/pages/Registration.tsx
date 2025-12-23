import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import type { RegistrationStatus } from "../types";

let sharedConnection: HubConnection | null = null;
let startingConnection = false;

function getConnection() {
  if (!sharedConnection) {
    sharedConnection = new HubConnectionBuilder()
      .withUrl("/hubs/registration", {
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();
  }
  return sharedConnection;
}

export default function Registration() {
  const [statuses, setStatuses] = useState<RegistrationStatus[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const connection = getConnection();
    let cancelled = false;

    const handleUpdate = (payload: RegistrationStatus[]) => {
      setStatuses(payload);
      setConnected(true);
      setLastUpdated(new Date());
    };

    connection.on("statusUpdated", handleUpdate);
    connection.onreconnected(() => setConnected(true));
    connection.onclose(() => !cancelled && setConnected(false));

    async function startConnection() {
      if (
        startingConnection ||
        connection.state === HubConnectionState.Connected
      ) {
        setConnected(connection.state === HubConnectionState.Connected);
        return;
      }

      startingConnection = true;
      try {
        await connection.start();
        if (!cancelled) {
          setConnected(true);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError("SignalR connection failed");
          console.error(err);
          setTimeout(startConnection, 3000);
        }
      } finally {
        startingConnection = false;
      }
    }

    startConnection();

    return () => {
      cancelled = true;
      connection.off("statusUpdated", handleUpdate);
    };
  }, []);

  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 text-sm text-slate-600">
        <div>
          <div>
            Connection status:{" "}
            <span className={connected ? "text-green-600" : "text-red-600"}>
              {connected ? "Live" : "Disconnected"}
            </span>
          </div>
          {lastUpdated && (
            <div>Last update: {lastUpdated.toLocaleTimeString("en-AU")}</div>
          )}
        </div>
        <div className="text-xs text-slate-500">
          * Mock status flips: the first car toggles between valid and expired
          every 5 seconds to show SignalR updates.
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Make</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Checked</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!error && statuses.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Waiting for live updates...
                </td>
              </tr>
            )}
            {!error &&
              statuses.map((status) => (
                <tr key={status.carId} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {status.make}
                  </td>
                  <td className="px-4 py-3">{status.model}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        status.isExpired
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {status.isExpired ? "Expired" : "Valid"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(status.expiresOn).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(status.checkedAt).toLocaleTimeString("en-AU")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
