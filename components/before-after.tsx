'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Comparison } from '@/lib/site'

const clamp = (v: number) => Math.min(100, Math.max(0, v))

function ComparisonFrame({ pair }: { pair: Comparison }) {
  const frame = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)

  const moveTo = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect()
    if (rect) setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5
    const next = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setPos(clamp(next))
  }

  return (
    <div
      ref={frame}
      className="ba-frame"
      data-dragging={dragging}
      style={{ '--pos': pos } as React.CSSProperties}
      // touch-action: pan-y (CSS) keeps vertical page scrolling; horizontal drags move the divider.
      onPointerDown={(e) => {
        frame.current?.setPointerCapture(e.pointerId)
        setDragging(true)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image src={pair.after.src} alt={pair.after.alt} fill sizes="(max-width: 960px) 100vw, 64vw" className="ba-image" />
      <div className="ba-before">
        <Image src={pair.before.src} alt={pair.before.alt} fill sizes="(max-width: 960px) 100vw, 64vw" className="ba-image" />
      </div>
      <span className="ba-label ba-label-before" aria-hidden="true">Before</span>
      <span className="ba-label ba-label-after" aria-hidden="true">After</span>
      <span className="ba-divider" aria-hidden="true" />
      <div
        className="ba-handle"
        role="slider"
        tabIndex={0}
        aria-label={`${pair.title}: before and after comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
        onKeyDown={onKeyDown}
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <ChevronRight size={16} aria-hidden="true" />
      </div>
    </div>
  )
}

export function BeforeAfter({ pairs }: { pairs: Comparison[] }) {
  const [index, setIndex] = useState(0)
  const pair = pairs[index]
  const go = (i: number) => setIndex((i + pairs.length) % pairs.length)
  const number = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <div className="compare">
      {/* key remounts the frame per slide: divider resets to 50% and the fade-in replays. */}
      <ComparisonFrame key={index} pair={pair} />
      <div className="compare-meta">
        <div className="compare-caption" aria-live="polite">
          <h3>{pair.title}</h3>
          <p>{pair.description}</p>
        </div>
        {pairs.length > 1 && (
          <div className="compare-nav">
            <button type="button" className="compare-arrow" onClick={() => go(index - 1)} aria-label="Previous comparison">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span className="compare-count" aria-hidden="true">{number(index)} / {number(pairs.length - 1)}</span>
            <button type="button" className="compare-arrow" onClick={() => go(index + 1)} aria-label="Next comparison">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <div className="compare-dots">
              {pairs.map((p, i) => (
                <button key={p.title} type="button" aria-label={`Show ${p.title}`} aria-current={i === index} onClick={() => go(i)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
