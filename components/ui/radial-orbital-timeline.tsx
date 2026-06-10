"use client";

import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface ServiceNode {
  id: number;
  title: string;
  items: string[];
  icon: React.ElementType;
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  nodes: ServiceNode[];
  large?: boolean;
}

export default function RadialOrbitalTimeline({ nodes, large = false }: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle]   = useState(0);
  const [autoRotate, setAutoRotate]         = useState(true);
  const [activeId, setActiveId]             = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const orbitRadius  = large ? 230 : 190;
  const ringPx       = large ? 460 : 380;
  const canvasH      = large ? 580 : 520;

  useEffect(() => {
    if (!autoRotate) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setRotationAngle((p) => Number(((p + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoRotate]);

  const handleSelect = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
      setAutoRotate(true);
    } else {
      setActiveId(id);
      setAutoRotate(false);
    }
  };

  const getPos = (index: number) => {
    const angle = ((index / nodes.length) * 360 + rotationAngle) % 360;
    const rad   = (angle * Math.PI) / 180;
    return {
      x:       orbitRadius * Math.cos(rad),
      y:       orbitRadius * Math.sin(rad),
      zIndex:  Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2))),
    };
  };

  const activeNode = nodes.find((n) => n.id === activeId) ?? null;

  const closePanel = () => { setActiveId(null); setAutoRotate(true); };

  const panelContent = activeNode ? (
    <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm p-6 shadow-sm w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <activeNode.icon size={17} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-black font-black text-lg tracking-tight leading-tight">{activeNode.title}</h3>
            <p className="text-black/50 text-xs mt-0.5">Included in every plan</p>
          </div>
        </div>
        <button
          onClick={closePanel}
          className="w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-black hover:bg-black/5 transition-all shrink-0 ml-4"
        >
          <X size={14} />
        </button>
      </div>

      {/* Checklist */}
      <ul className="flex flex-col gap-2.5 mb-5">
        {activeNode.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-black">
            <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>

      {/* Related */}
      {activeNode.relatedIds.length > 0 && (
        <div className="pt-4 border-t border-black/8">
          <p className="text-[10px] uppercase tracking-widest text-black/35 mb-2.5 font-semibold">Also includes</p>
          <div className="flex flex-wrap gap-2">
            {activeNode.relatedIds.map((rid) => {
              const rel = nodes.find((n) => n.id === rid);
              if (!rel) return null;
              const RelIcon = rel.icon;
              return (
                <button
                  key={rid}
                  onClick={() => handleSelect(rid)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-black/5 text-black/60 text-xs font-medium hover:bg-black/10 hover:text-black transition-all"
                >
                  <RelIcon size={11} />
                  {rel.title}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start md:gap-8">
      {/* Orbital canvas */}
      <div className="md:w-[520px] md:shrink-0">
        <div
          ref={containerRef}
          className="relative w-full flex items-center justify-center"
          style={{ height: canvasH }}
          onClick={(e) => {
            if (e.target === containerRef.current) {
              setActiveId(null);
              setAutoRotate(true);
            }
          }}
        >
          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-black/10 pointer-events-none"
            style={{ width: ringPx, height: ringPx }}
          />

          {/* Center orb */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 animate-pulse flex items-center justify-center z-10 pointer-events-none shadow-lg shadow-blue-300/30">
            <div className="absolute w-24 h-24 rounded-full border border-blue-400/30 animate-ping opacity-60" />
            <div className="absolute w-28 h-28 rounded-full border border-indigo-400/20 animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
            <Image
              src="/images/logo.png"
              alt="Rocks Media"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </div>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const pos       = getPos(i);
            const isActive  = node.id === activeId;
            const isRelated = activeId !== null &&
              nodes.find((n) => n.id === activeId)?.relatedIds.includes(node.id);
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                className="absolute flex flex-col items-center cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex:    isActive ? 200 : pos.zIndex,
                  opacity:   isActive ? 1 : pos.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); handleSelect(node.id); }}
              >
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 56, height: 56, top: -8, left: -8,
                    background: isActive
                      ? "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
                  }}
                />
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive
                      ? "bg-blue-600 text-white border-blue-600 scale-150 shadow-lg shadow-blue-400/40"
                      : isRelated
                      ? "bg-blue-100 text-blue-600 border-blue-400 animate-pulse"
                      : "bg-white text-black/70 border-black/15 hover:border-blue-400 hover:text-blue-600 shadow-sm"}
                  `}
                >
                  <Icon size={15} />
                </div>
                <span
                  className={`
                    absolute top-12 whitespace-nowrap text-[11px] font-bold tracking-wide transition-all duration-300 pointer-events-none
                    ${isActive ? "text-blue-600 scale-125" : "text-black"}
                  `}
                >
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile — slides in below (unchanged) */}
      <div
        className={`md:hidden w-full transition-all duration-500 overflow-hidden ${
          activeNode ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0"
        }`}
      >
        {activeNode && <div className="mb-8">{panelContent}</div>}
      </div>

      {/* Desktop — fixed panel to the right of the orbital */}
      <div
        className="hidden md:flex flex-1 flex-col justify-center"
        style={{ minHeight: canvasH }}
      >
        {activeNode ? (
          panelContent
        ) : (
          <p className="text-xs text-black text-center leading-relaxed">
            Select a node to see<br />what is included
          </p>
        )}
      </div>
    </div>
  );
}
