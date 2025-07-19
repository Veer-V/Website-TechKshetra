'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'

const eventImages = [
  '/events/event1.jpg',
  '/events/event2.jpg',
  '/events/event3.jpg',
]

function Card({ children }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function CardContent({ children }) {
  return <div style={{ padding: 0 }}>{children}</div>
}

export default function Page() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef(null)
  const total = eventImages.length

  // Clamp function helper
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

  const prevSlide = () => {
    setCurrent(current === 0 ? total - 1 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === total - 1 ? 0 : current + 1)
  }

  // Start dragging
  const handlePointerDown = (e) => {
    setDragging(true)
    setStartX(e.clientX || e.touches[0].clientX)
  }

  // Drag move
  const handlePointerMove = (e) => {
    if (!dragging) return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX)
    if (!currentX) return

    const diff = currentX - startX
    setTranslateX(diff)
  }

  // Drag end
  const handlePointerUp = () => {
    if (!dragging) return
    setDragging(false)

    const containerWidth = containerRef.current.offsetWidth
    const swipeThreshold = containerWidth / 4 // swipe at least 25% width

    if (translateX > swipeThreshold) {
      prevSlide()
    } else if (translateX < -swipeThreshold) {
      nextSlide()
    }
    setTranslateX(0)
  }

  return (
    <div
      style={{
        marginTop:'7%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        background: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
        userSelect: dragging ? 'none' : 'auto',
        touchAction: 'pan-y', 
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #1976d2',
          marginBottom: 30,
          position: 'relative',
        }}
      >
        <Image src="" alt="CybervulnX Logo" layout="fill" objectFit="cover" />
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 28, marginBottom: 10, textAlign: 'center' }}>
        Welcome to CybervulnX !!!
      </h1>

      {/* Description */}
      <p
        style={{
          maxWidth: 700,
          textAlign: 'center',
          marginBottom: 40,
          lineHeight: 1.5,
          color: '#333',
        }}
      >
        CybervulnX is a student-led cybersecurity cell under TechKshetra, dedicated to promoting awareness, knowledge, and hands-on skills in ethical hacking, digital forensics, and cyber defense.

        With a strong focus on ethical tech practices and cyber hygiene, CybervulnX serves as a launchpad for future white-hat hackers and cybersecurity professionals.
      </p>

      {/* Events Heading */}
      <h2 style={{ fontSize: 22, marginBottom: 20 }}>Events</h2>

      {/* Carousel container */}
      <div
        ref={containerRef}
        style={{
          width: 600,
          maxWidth: '90vw',
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Slides wrapper */}
        <div
          style={{
            display: 'flex',
            transition: dragging ? 'none' : 'transform 0.5s ease-in-out',
            transform: `translateX(calc(-${current * 100}% + ${translateX}px))`,
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          {eventImages.map((src, i) => (
            <div
              key={i}
              style={{
                minWidth: '100%',
                boxSizing: 'border-box',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card>
                <CardContent>
                  <Image
                    src={src}
                    alt={`Event ${i + 1}`} 
                    width={600}
                    height={300}
                    style={{ objectFit: 'cover', borderRadius: 10, userSelect: 'none', pointerEvents: 'none' }}
                    draggable={false}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: 36,
            height: 36,
            cursor: 'pointer',
            fontSize: 24,
            lineHeight: 1,
            userSelect: 'none',
            zIndex: 10,
          }}
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: 36,
            height: 36,
            cursor: 'pointer',
            fontSize: 24,
            lineHeight: 1,
            userSelect: 'none',
            zIndex: 10,
          }}
        >
          ›
        </button>
      </div>

      {/* Slide Indicator */}
      <p style={{ marginTop: 15, color: '#555' }}>
        Slide {current + 1} of {total}
      </p>
    </div>
  )
}