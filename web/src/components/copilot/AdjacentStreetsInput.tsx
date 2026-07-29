"use client";

import type { AdjacentStreet, StreetKind, StreetSide } from "@/lib/compliance";

const sideLabels: Record<StreetSide, string> = {
  north: "شمال",
  south: "جنوب",
  east: "شرق",
  west: "غرب",
};

const kinds: StreetKind[] = ["اصلی", "فرعی", "بن‌بست"];
const sides: StreetSide[] = ["north", "south", "east", "west"];

interface Props {
  streets: AdjacentStreet[];
  onChange: (streets: AdjacentStreet[]) => void;
}

export function AdjacentStreetsInput({ streets, onChange }: Props) {
  function addStreet() {
    const usedSides = new Set(streets.map((s) => s.side));
    const nextSide = sides.find((s) => !usedSides.has(s)) ?? "north";
    onChange([...streets, { side: nextSide, widthMeters: 12, kind: "اصلی" }]);
  }

  function updateStreet(index: number, patch: Partial<AdjacentStreet>) {
    onChange(streets.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function removeStreet(index: number) {
    onChange(streets.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      {streets.map((street, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 border border-charcoal/10 bg-warm-white p-2">
          <select
            value={street.side}
            onChange={(e) => updateStreet(i, { side: e.target.value as StreetSide })}
            className="border border-charcoal/15 bg-warm-white px-2 py-1.5 text-xs"
          >
            {sides.map((s) => (
              <option key={s} value={s}>{sideLabels[s]}</option>
            ))}
          </select>
          <input
            type="number"
            value={street.widthMeters}
            onChange={(e) => updateStreet(i, { widthMeters: Number(e.target.value) })}
            placeholder="عرض (متر)"
            className="border border-charcoal/15 bg-warm-white px-2 py-1.5 text-xs"
          />
          <select
            value={street.kind}
            onChange={(e) => updateStreet(i, { kind: e.target.value as StreetKind })}
            className="border border-charcoal/15 bg-warm-white px-2 py-1.5 text-xs"
          >
            {kinds.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          <button type="button" onClick={() => removeStreet(i)} className="text-charcoal/40 hover:text-red-500">
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addStreet}
        className="border border-charcoal/30 px-3 py-1.5 text-xs font-bold hover:bg-charcoal hover:text-warm-white"
      >
        + افزودن معبر
      </button>
    </div>
  );
}
