"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function SmartPlanner({ service }) {
  const [goal, setGoal] = useState("balanced");
  const [stage, setStage] = useState("growing");

  const recommendation = useMemo(() => {
    const goalScore = { test: 0, balanced: 1, scale: 2 }[goal];
    const stageScore = { new: 0, growing: 1, established: 2 }[stage];
    const packs = service.packages;
    const last = packs.length - 1;
    const center = Math.max(0, packs.findIndex((pack) => pack.popular));
    const ladder = [0, Math.max(0, center - 1), center, Math.min(last, center + 2), last];
    const index = ladder[goalScore + stageScore];
    return service.packages[index];
  }, [goal, service.packages, stage]);

  return (
    <section className="planner" aria-labelledby="planner-title">
      <div className="planner-copy">
        <span className="kicker light">✦ Smart package planner</span>
        <h2 id="planner-title">Find a sensible place to start</h2>
        <p>Tell us how you want to use this campaign. The planner matches your answers to a proportional starting package—you can still choose any option.</p>
      </div>
      <div className="planner-controls">
        <label>
          Campaign goal
          <select value={goal} onChange={(event) => setGoal(event.target.value)}>
            <option value="test">Test the service</option>
            <option value="balanced">Build balanced momentum</option>
            <option value="scale">Support a larger launch</option>
          </select>
        </label>
        <label>
          Account stage
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            <option value="new">New or small</option>
            <option value="growing">Growing steadily</option>
            <option value="established">Established</option>
          </select>
        </label>
        <div className="planner-result" aria-live="polite">
          <span>Suggested starting package</span>
          <strong>{recommendation.quantity} <small>for {recommendation.price}</small></strong>
          <p>Start here, review delivery and profile fit, then scale gradually.</p>
          <Link className="button" href={`/cart?service=${service.slug}&package=${encodeURIComponent(recommendation.quantity)}`}>
            Choose this package <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
