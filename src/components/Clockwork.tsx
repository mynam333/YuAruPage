import { GearSix, Sparkle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export default function Clockwork({ className }: { className?: string }) {
  return (
    <div className={cn('clockwork', className)} aria-hidden="true">
      <div className="clock-ring ring-outer">
        <span className="orbit-bead" />
      </div>
      <div className="clock-ring ring-ticks" />
      <div className="clock-ring ring-inner" />
      <div className="clock-ring ring-orbit" />
      <div className="clock-cross cross-one" />
      <div className="clock-cross cross-two" />
      <GearSix className="clock-gear gear-one" weight="thin" />
      <GearSix className="clock-gear gear-two" weight="thin" />
      <Sparkle className="clock-star star-one" weight="fill" />
      <Sparkle className="clock-star star-two" weight="fill" />
      <span className="clock-numeral numeral-top">XII</span>
      <span className="clock-numeral numeral-right">III</span>
      <span className="clock-numeral numeral-bottom">VI</span>
      <span className="clock-numeral numeral-left">IX</span>
    </div>
  )
}
