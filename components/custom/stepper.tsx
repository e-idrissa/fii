"use client"

import { useState, useEffect, useRef } from 'react'

type Props = {
  steps: string[],
  currentStep: number
}

type StepRefType = {
  description: string,
  completed: boolean,
  highlighted: boolean,
  selected: boolean,
}[]

type UpdateStepParams = {
  stepNumber: number,
  steps: StepRefType
}

const Stepper = ({ steps, currentStep }: Props) => {

  const [newStep, setNewStep] = useState<StepRefType>([])
  const stepRef = useRef<StepRefType>()

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false
        }
      )
    )
    stepRef.current = stepsState
    const current = updateStep({ stepNumber: currentStep, steps: stepsState })
    setNewStep(current)
  }, [steps, currentStep])

  const updateStep = ({ stepNumber, steps }: UpdateStepParams) => {
    const newStep = [...steps]
    let count = 0

    while (count < newStep.length) {
      // current step
      if (count === stepNumber) {
        newStep[count] = {
          ...newStep[count],
          highlighted: true,
          selected: true,
          completed: false
        }
        count++
      }
      // completed steps
      else if (count <= stepNumber) {
        newStep[count] = {
          ...newStep[count],
          highlighted: true,
          selected: true,
          completed: true
        }
        count++
      }
      // pending steps
      else {
        newStep[count] = {
          ...newStep[count],
          highlighted: false,
          selected: false,
          completed: false
        }
        count++
      }

    }
    return newStep
  }

  const displaySteps = newStep.map((step, index) => (
    <div key={index} className={index === newStep.length - 1 ? `flex items-center` : `w-full flex items-center`}>
      <div className="relative flex flex-col items-center text-teal-600">
        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${step.selected && "bg-green-600 text-white font-bold border border-green-600"}`}>
          {step.completed ? (
            <span className="text-white font-bold text-xl">&#10003;</span>
          ) : (index + 1)}
        </div>
        <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase hidden lg:block ${step.highlighted ? "text-gray-700" : "text-gray-400"}`}>{step.description}</div>
      </div>
      {/* Display line */}
      <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.highlighted ? "border-green-600" : "border-gray-300"}`}/>
    </div>
  ))

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  )
}

export default Stepper