import { useRef, useState } from 'react'
import { resizeImage } from './patientFormUtils'

export const usePatientImage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const resizedFile = await resizeImage(file)
      setSelectedFile(resizedFile)

      const reader = new FileReader()
      reader.onload = (loadEvent) => {
        setPreviewUrl(loadEvent.target.result)
      }
      reader.readAsDataURL(resizedFile)
    } catch (error) {
      console.error('Error resizing the image:', error)
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const clearImageSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    fileInputRef,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleFileButtonClick,
    clearImageSelection
  }
}
