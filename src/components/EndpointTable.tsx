import type { ParsedEndpoint } from '../utils/apicParser';

interface EndpointTableProps {
  endpoints: ParsedEndpoint[];
}

export default function EndpointTable({ endpoints }: EndpointTableProps) {
  if (endpoints.length === 0) {
    return null;
  }

  const sortedEndpoints = [...endpoints].sort((a, b) => {
    const ipA = a.ip.split('.').map(Number);
    const ipB = b.ip.split('.').map(Number);
    for (let i = 0; i < 4; i++) {
      if (ipA[i] !== ipB[i]) return ipA[i] - ipB[i];
    }
    return 0;
  });

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        All Endpoints ({endpoints.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold min-w-[150px]">
                IP Address
              </th>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold min-w-[140px]">
                MAC Address
              </th>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold min-w-[80px]">
                Node
              </th>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold min-w-[180px]">
                VPC Interface
              </th>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-center font-semibold min-w-[60px]">
                VLAN
              </th>
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold min-w-[180px]">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEndpoints.map((ep, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 text-xs font-mono text-slate-900">
                  {ep.ip}
                </td>
                <td className="border border-slate-300 px-3 py-2 text-xs font-mono text-slate-700">
                  {ep.mac}
                </td>
                <td className="border border-slate-300 px-3 py-2 text-xs font-mono text-slate-700">
                  {ep.node}
                </td>
                <td className="border border-slate-300 px-3 py-2 text-xs font-mono text-slate-700 truncate">
                  {ep.interface}
                </td>
                <td className="border border-slate-300 px-3 py-2 text-xs text-center text-slate-700">
                  {ep.vlan}
                </td>
                <td className="border border-slate-300 px-3 py-2 text-xs text-slate-600">
                  {ep.createTs || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
