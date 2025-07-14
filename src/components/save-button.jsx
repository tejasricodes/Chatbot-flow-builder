"use client"

import { Button } from "./ui/button"

// Save Button component
export const SaveButton = ({ onSave }) => {
  return (
    <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white">
      Save Changes
    </Button>
  )
}
