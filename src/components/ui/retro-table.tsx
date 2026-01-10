import React from 'react';
import { cn } from '@/lib/utils';
interface RetroTableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}
export function RetroTable({ headers, rows, className }: RetroTableProps) {
  return (
    <div className={cn("overflow-x-auto border-2 border-neon-green/30", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neon-green/20 border-b-2 border-neon-green/30">
            {headers.map((header, i) => (
              <th 
                key={i} 
                className="p-3 text-[10px] font-bold uppercase tracking-widest text-neon-green"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono text-xs">
          {rows.map((row, i) => (
            <tr 
              key={i} 
              className={cn(
                "border-b border-neon-green/10 hover:bg-neon-green/5 transition-colors",
                i % 2 === 0 ? "bg-black/20" : "bg-transparent"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="p-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}