---
lang: en
title: "Case study: RegWatch — how 6 agents power an 80%-margin compliance service"
date: 2026-06-10
tag: Case study
permalink: /en/insights/regwatch/
excerpt: "A compliance-monitoring OPC where a 6-agent pipeline auto-produces daily briefings. $5/mo per customer, a 5,000-customer target, under 15 minutes of human work per day."
---

RegWatch was the first vertical OPC we validated in the MVP phase: a **compliance-monitoring service for outbound businesses**. Its value isn't complexity — it's that it proved the unit economics of "one person + a set of agents = a team" in the plainest possible terms.

## The problem it solves

Outbound SMBs must keep watching regulators — US EPA/FDA, EU GDPR and more — but a compliance team is expensive. RegWatch turns this into a subscription:

- **Price**: $5 / month / customer
- **Target scale**: 5,000 customers
- **Gross margin**: ~80% (operating cost ≈ $0.10/customer/month)
- **Human effort**: under 15 minutes a day (key-checkpoint review only)

## Architecture: a 6-agent pipeline

The core is a fixed agent pipeline that runs once a day:

1. **Planner** — plans the day's scan scope and priorities
2. **RegScanner** — fetches the latest from each regulatory source
3. **LegalInterpreter** — translates statutes/notices into business language
4. **RiskMapper** — maps changes onto each customer's business profile
5. **AlertComposer** — generates a personalized compliance briefing
6. **Critic** — scores quality; below threshold sends it back

This is a concrete instance of the [Think → Do → Check → Improve]({{ '/en/opc.html#architecture' | relative_url }}) loop: the first five agents handle Think/Do, the Critic handles Check, and the distilled rules enter memory to complete Improve.

## Why the margin reaches 80%

The key is **model routing**. Most RegWatch tasks (fetching, classifying, tagging) sit at L1 (Haiku / Qwen-7B); only reasoning tasks like statute interpretation escalate to L3. Combined with Prompt Cache — system prompts, customer profiles and SOP docs are reused constantly — per-customer model cost is pressed to about $0.10/month. See our breakdown of [smart model routing]({{ '/en/opc.html' | relative_url }}).

## Three reusable takeaways

- **Narrower vertical, higher automation**: a fixed pipeline with fixed output formats makes Critic scoring far more stable than open-ended tasks.
- **Keep humans at checkpoints, not in the whole flow**: RegWatch humans review only high-risk briefings; the rest is automatic.
- **Unit economics before scale**: make per-customer margin positive first, then talk about 5,000 customers.

The RegWatch template is now a reference case for [Enterprise Service OPC]({{ '/en/opc.html#verticals' | relative_url }}). Want to run a vertical compliance service? [Contact us]({{ '/en/contact.html' | relative_url }}).
