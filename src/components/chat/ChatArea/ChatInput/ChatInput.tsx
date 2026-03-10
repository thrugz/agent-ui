'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Mic, Square } from 'lucide-react'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'
import useVoiceRecorder from '@/hooks/useVoiceRecorder'
import { cn } from '@/lib/utils'

const ChatInput = () => {
  const { chatInputRef } = useStore()

  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [teamId] = useQueryState('team')
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = useStore((state) => state.isStreaming)

  const { isRecording, startRecording, stopRecording, error: voiceError, isSupported: voiceSupported } = useVoiceRecorder()

  useEffect(() => {
    if (voiceError) toast.error(voiceError)
  }, [voiceError])

  const handleSubmit = async () => {
    if (!inputMessage.trim()) return

    const currentMessage = inputMessage
    setInputMessage('')

    try {
      await handleStreamResponse(currentMessage)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  const handleVoiceTap = async () => {
    if (!isRecording) {
      await startRecording()
    } else {
      try {
        const blob = await stopRecording()
        if (blob.size < 1000) { toast.error('Recording too short'); return }
        const ext = blob.type.includes('mp4') ? 'mp4' : blob.type.includes('ogg') ? 'ogg' : 'webm'
        const formData = new FormData()
        formData.append('message', 'Voice message')
        formData.append('audio', blob, `voice.${ext}`)
        await handleStreamResponse(formData)
      } catch (err) {
        toast.error(`Voice error: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  }

  return (
    <div className="relative mx-auto mb-1 flex w-full max-w-2xl items-end justify-center gap-x-2 font-geist px-2 md:px-0">
      <TextArea
        placeholder={'Ask anything'}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !e.nativeEvent.isComposing &&
            !e.shiftKey &&
            !isStreaming
          ) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        className="w-full border border-accent bg-primaryAccent px-4 text-base text-primary focus:border-accent md:text-sm"
        disabled={!(selectedAgent || teamId)}
        ref={chatInputRef}
      />
      {voiceSupported && (
        <Button
          type="button"
          onClick={handleVoiceTap}
          disabled={!(selectedAgent || teamId) || isStreaming}
          size="icon"
          className={cn(
            'rounded-xl p-5 transition-colors',
            isRecording ? 'animate-pulse bg-destructive text-white' : 'bg-primary text-primaryAccent'
          )}
          aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
        >
          {isRecording ? <Square className="size-4" /> : <Mic className="size-4" />}
        </Button>
      )}
      <Button
        onClick={handleSubmit}
        disabled={
          !(selectedAgent || teamId) || !inputMessage.trim() || isStreaming
        }
        size="icon"
        className="rounded-xl bg-primary p-5 text-primaryAccent"
      >
        <Icon type="send" color="primaryAccent" />
      </Button>
    </div>
  )
}

export default ChatInput
