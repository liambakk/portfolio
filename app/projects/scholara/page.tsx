"use client";

import React from "react";
import ProjectLayout from "@/components/ProjectLayout";
import ScholaraVideo from "@/components/ScholaraVideo";
import { ProjectData } from "@/types/project";

export default function ScholaraProject() {
  const projectData: ProjectData = {
    title: "Scholara",
    externalLink: "https://scholara.ai",
    previewImage: "/previews/scholara_cover.png",
    overview: {
      description: "AI-powered systematic review automation, built to compress a process that takes research teams months into one that takes weeks, without giving up the methodological rigor the field is built on. Role: Founder and CEO. Live and in active development."
    },
    team: {
      title: "Problem",
      description: "A systematic review is the highest tier of evidence in medicine. It's how the field decides what's actually true: gather every relevant study on a question, screen them against strict criteria, extract and synthesise the data, and assess the quality of what you've found. Regulators, clinical guideline committees, and journals like Cochrane treat it as the gold standard. It's also brutally slow. A single review routinely takes a research team 6 to 18 months. Two reviewers independently screen thousands of abstracts to remove bias. Data is extracted by hand. The whole thing has to comply with established protocols (PRISMA, Cochrane, GRADE) that exist precisely because the stakes are too high for shortcuts. The result is a bottleneck that sits at the centre of pharma, biotech, and academic research. Evidence that already exists takes a year to assemble into something usable. We started Scholara because that year is the gap between a question and a decision, and most of it is mechanical work that doesn't need a PhD to perform, only to verify.",
      members: [
        { name: "Liam Bakker", role: "Founder & CEO" }
      ]
    },
    goals: {
      items: [
        { text: "Search & retrieval across the literature, structured to the review's inclusion criteria." },
        { text: "Dual-screening of titles and abstracts, preserving the independent-reviewer logic that controls for bias." },
        { text: "Data extraction from full texts into structured, checkable form." },
        { text: "Meta-analysis: forest plots and heterogeneity statistics, generated from the extracted data." },
        { text: "GRADE assessment of evidence quality, formatted to standard." },
        { text: "PRISMA flow diagrams and the reporting artefacts a review needs to be publishable." }
      ]
    },
    roleProcess: [
      {
        title: "Our Approach",
        description: "",
        tasks: [],
        customContent: (
          <div className="scholara-split">
            <div className="scholara-text">
              <p className="role-description">The obvious move in 2024 was to point a large language model at the literature. We were sure that would fail, and it does. The reason a systematic review is trusted isn't that it's thorough, it's that it's auditable. Every inclusion decision, every extracted data point, every quality judgement has to be defensible. A model that produces a confident answer with no traceable reasoning is worse than useless here; it's a liability. So the design problem wasn't whether AI can read papers. It was how you automate the mechanical 90% while keeping the process rigorous enough that a methodologist would sign their name to the output. Scholara's answer is a multi-agent system running across a 9-phase pipeline that mirrors the actual Cochrane workflow rather than replacing it. Each phase (search, screening, extraction, synthesis, quality assessment) is handled by purpose-built agents, with human review deliberately retained at the points where methodology demands a person, not removed for the sake of a faster demo. The goal was never for AI to do the review. It was for AI to do the labour while the researcher keeps the judgement.</p>
            </div>
            <div className="scholara-media">
              <ScholaraVideo src="/scholara/screening.mp4" width={3512} height={2160} />
              <ScholaraVideo src="/scholara/table.mp4" width={3540} height={2160} />
            </div>
          </div>
        )
      },
      {
        title: "My Role",
        description: "I'm the sole founder and CEO. My work sits on the product, strategy, and commercial side rather than the engineering. I had to get deep enough into systematic review methodology to make product decisions credibly, despite not having come from a clinical research background, which was most of the first stretch of this build. Concretely, that has meant:",
        tasks: [
          { description: "Product direction: defining the 9-phase pipeline against real Cochrane methodology, and making the repeated call to keep humans in the loop where rigor demanded it rather than chase a more impressive autonomous demo." },
          { description: "Domain grounding: building the internal knowledge base that the whole team and our own AI systems work from, covering the product architecture, the competitor landscape, and our methodology." },
          { description: "Go-to-market: figuring out how a tool this technical reaches pharma, biotech, and academic buyers, and building the early commercial motion." },
          { description: "Fundraising: running the raise, including the investor narrative and outreach." }
        ]
      },
      {
        title: "Design & UX Decisions",
        description: "",
        tasks: [],
        customContent: (
          <div className="scholara-split">
            <div className="scholara-text">
              <p className="role-description">The hardest design question in Scholara isn't visual, it's trust. A researcher is being asked to put their name on a review and defend it. If the interface lets them coast on the AI's confidence, we've built a malpractice machine. A few decisions followed from that:</p>
              <ul className="process-tasks">
                <li>Surfacing uncertainty, not hiding it. Where the system is unsure, the interface flags it for human review rather than smoothing it into a clean answer. The friction is the point.</li>
                <li>Auditability over speed. We could have made the product feel faster by collapsing steps. We didn't, because a review you can't trace is a review you can't publish.</li>
                <li>Human-in-the-loop as a feature, not a fallback. The review checkpoints are designed as deliberate stops where the researcher's judgement is required, framed as control rather than as the AI asking for help.</li>
              </ul>
            </div>
            <div className="scholara-media">
              <ScholaraVideo src="/scholara/reasons.mp4" width={2784} height={2160} />
            </div>
          </div>
        )
      },
      {
        title: "Traction & Outcomes",
        description: "",
        tasks: [
          { description: "1,200 institutional users across research teams." },
          { description: "Pilots run with research and industry partners." },
          { description: "SOC 2 Type II compliance and a completed black-box penetration test, credibility signals that matter to regulated buyers." }
        ]
      },
      {
        title: "How It's Built",
        description: "",
        tasks: [],
        customContent: (
          <div className="scholara-split">
            <div className="scholara-text">
              <p className="role-description">A multi-agent architecture, with each pipeline phase handled by specialised agents. The compliance and security layer, SOC 2 Type II and independent penetration testing, was treated as core product, not paperwork, because the buyers we care about can't adopt a tool that fails their security review.</p>
            </div>
            <div className="scholara-media">
              <ScholaraVideo src="/scholara/plot.mp4" width={3512} height={2160} />
              <ScholaraVideo src="/scholara/prisma.mp4" width={2784} height={2160} />
            </div>
          </div>
        )
      },
      {
        title: "What's Next",
        description: "The thing I underestimated was how much the product's credibility lives outside the model. The hard problems have been methodological fidelity, security posture, and earning the trust of researchers who are right to be sceptical of AI in their workflow, not raw capability. Open questions we're still working through: reliable full-text access at scale (a browser-extension approach near-term, publisher licensing longer-term), and how far automation can responsibly extend into the synthesis itself. Where it's going: from compressing single reviews to becoming the default infrastructure for assembling evidence, the layer between a research question and a defensible answer.",
        tasks: []
      }
    ]
  };

  return <ProjectLayout {...projectData} />;
}
