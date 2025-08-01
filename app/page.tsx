"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function AraChat() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [truthScore, setTruthScore] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)

    // 1 second loading animation
    setTimeout(() => {
      setIsLoading(false)
      setInput("")

      // 2 second delay before showing result
      setTimeout(() => {
        const randomScore = Math.floor(Math.random() * 91) + 10 // 10-100%
        setTruthScore(randomScore)
        setIsTyping(true)

        // Typing animation duration
        setTimeout(() => {
          setIsTyping(false)
          setShowResult(true)
        }, 1500)
      }, 2000)
    }, 1000)
  }

  const resetResult = () => {
    setShowResult(false)
    setIsTyping(false)
    setTruthScore(0)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 transition-all duration-500 ease-out transform hover:scale-105">
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative animate-pulse">
          <Image
            src="/ara-logo.png"
            alt="ARA Logo"
            fill
            className="object-contain transition-all duration-300 ease-in-out hover:brightness-110"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-16 sm:pt-0">
        <div className="w-full max-w-4xl px-4 sm:px-8">
          {/* Input Form - Moved lower */}
          <div className="transform translate-y-8 sm:translate-y-16 transition-all duration-700 ease-out">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center font-serif">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything"
                className="flex-1 border-gray-700 text-white placeholder-gray-400 h-12 sm:h-14 px-4 sm:px-6 text-base sm:text-lg focus:border-gray-500 focus:ring-gray-500 rounded-3xl bg-gray-800/50 backdrop-blur-sm italic transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02] hover:bg-gray-700/50 focus:bg-gray-700/50 w-full sm:w-auto"
                disabled={isLoading || isTyping}
              />
              <Button
                type="submit"
                disabled={isLoading || isTyping || !input.trim()}
                className="bg-gray-600/80 hover:bg-gray-500/80 text-white rounded-2xl h-12 sm:h-14 px-6 sm:px-8 min-w-[100px] sm:min-w-[120px] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 backdrop-blur-sm border border-gray-500/30 hover:border-gray-400/50 w-full sm:w-auto"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Sending</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base">Send</span>
                )}
              </Button>
            </form>
          </div>

          {/* Result Display */}
          {(isTyping || showResult) && (
            <div className="mt-12 sm:mt-16 text-center transform transition-all duration-1000 ease-out animate-in fade-in slide-in-from-bottom-4">
              <div className="inline-block p-6 sm:p-8 rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-700/50 shadow-2xl">
                <div className="text-xl sm:text-2xl font-semibold mb-4 transition-all duration-500 ease-out">
                  <span className="inline-block transform transition-all duration-700 ease-out">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Truthscore:
                    </span>
                    {isTyping ? (
                      <span className="ml-2 inline-block w-12 sm:w-16 h-6 bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse rounded transition-all duration-300"></span>
                    ) : (
                      <span className="ml-2 text-blue-400 transform transition-all duration-500 ease-out animate-in fade-in scale-in-50">
                        {truthScore}%
                      </span>
                    )}
                  </span>
                </div>

                {showResult && (
                  <div className="text-lg sm:text-xl font-medium transform transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-2 delay-300">
                    {truthScore > 50 ? (
                      <span className="text-green-400 drop-shadow-lg animate-pulse">True</span>
                    ) : (
                      <span className="text-red-400 drop-shadow-lg animate-pulse">False Claim</span>
                    )}
                  </div>
                )}

                {showResult && (
                  <Button
                    onClick={resetResult}
                    className="mt-6 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-xl px-4 sm:px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-gray-500/30 hover:border-gray-400/50 animate-in fade-in slide-in-from-bottom-4 delay-500"
                  >
                    Ask Another Question
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Powered by section */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 text-gray-400 transition-all duration-500 ease-out transform hover:scale-105">
        <span className="text-xs sm:text-sm transition-all duration-300 ease-in-out hover:text-gray-300">
          Powered by
        </span>
        <div className="rounded-full p-2 flex items-center justify-center backdrop-blur-sm border border-gray-700/50 transition-all duration-300 ease-in-out hover:bg-gray-800/50 hover:border-gray-600/50 bg-black">
          <Image
            src="/logo.png"
            alt="Logo"
            width={16}
            height={16}
            className="object-contain sm:w-5 sm:h-5 transition-all duration-300 ease-in-out hover:brightness-110"
          />
        </div>
      </div>

      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-blue-900/10 pointer-events-none animate-pulse"></div>
    </div>
  )
}
