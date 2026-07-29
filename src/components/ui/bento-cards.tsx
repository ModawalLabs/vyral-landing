"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { AmbientVideo } from "@/components/ui/ambient-video"
import {
  CornerPlusIcons,
  plusFrameShell,
} from "@/components/ui/plus-frame"
import { cn } from "@/lib/utils"

const steps = [
  {
    step: "01",
    title: "Enter Your Prompt",
    description:
      "Simply describe what you want. A product ad, a social media video, or a creative concept.",
  },
  {
    step: "02",
    title: "AI Works Its Magic",
    description:
      "Our advanced AI processes your input, understands context, and generates perfect video.",
  },
  {
    step: "03",
    title: "Get Your Video!",
    description:
      "Download your professionally crafted video ad, ready to share and convert.",
  },
]

// Shared shell so text and media cards read as the same object.
const cardShell = plusFrameShell

const StepCard: React.FC<{
  className?: string
  step: string
  title: string
  description: string
}> = ({ className = "", step, title, description }) => {
  return (
    <div className={cn(cardShell, "flex min-h-[200px] flex-col p-6", className)}>
      <CornerPlusIcons />
      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-xs tracking-widest text-zinc-400 dark:text-zinc-500">
          {step}
        </span>
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}

const MediaCard: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className = "", children }) => {
  return (
    <div className={cn(cardShell, "flex min-h-[260px] p-2", className)}>
      <CornerPlusIcons />
      {/* Inner clip is on a child so the corner icons stay visible outside it.
          flex-1 (not h-full) because a % height can't resolve against a parent
          that only has min-height — the panel would collapse to zero. */}
      <div className="relative z-10 flex-1 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  )
}

export default function BentoCards() {
  return (
    <section className="bg-white dark:bg-black dark:bg-transparent">
      <div className="mx-auto container py-32 sm:py-48 px-4">
        {/* Section heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
            Create Viral Videos Faster
          </h2>
        </div>

        {/* Steps read left to right, then the output below them */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <StepCard {...steps[0]} className="sm:col-span-2 lg:col-span-2" />

          <MediaCard className="sm:col-span-2 lg:col-span-4">
            <AmbientVideo
              sources={[
                { src: "/assets/others/scarecrow-field.mp4", type: "video/mp4" },
              ]}
              poster="/assets/others/scarecrow-field-poster.webp"
            />
          </MediaCard>

          <StepCard {...steps[1]} className="lg:col-span-2" />
          <StepCard {...steps[2]} className="lg:col-span-2" />

          {/* Borderless cell — a bordered one here would read as a fourth
              step card without a number. */}
          <div className="flex flex-col justify-center px-2 py-4 pr-12 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:px-4 lg:py-0 lg:pr-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 lg:pr-16">
              Create high-impact short and long-form videos in minutes so you
              know exactly what you&apos;re getting. Skip the crew, the edit
              bay, and the endless revision cycles — describe your idea once and
              publish a finished, on-brand video the same day.
            </p>

            <Link
              href="#cta"
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-orange-500 bg-white px-6 py-3 text-sm font-medium text-black shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-[1.03] active:scale-100"
            >
              Try Vyral Now
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <MediaCard className="sm:col-span-2 lg:col-span-4">
            <Image
              src="/assets/others/2151763016.jpg"
              alt="Hot air balloon drifting over a flower field at sunrise"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </MediaCard>
        </div>
      </div>
    </section>
  )
}
