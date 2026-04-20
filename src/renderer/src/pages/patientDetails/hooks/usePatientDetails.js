import { useEffect, useState } from 'react'
import { getCompletePatient } from '../../../api/Api'
import { normalizeCompletePatientData } from '../utils/patientDetails.utils'

const usePatientDetails = (patientId) => {
  const [patient, setPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchPatient = async () => {
      try {
        const response = await getCompletePatient(patientId)
        const completeData = normalizeCompletePatientData(response.data?.data)

        if (!isMounted) {
          return
        }

        setPatient(completeData?.id ? completeData : null)
      } catch (error) {
        console.error('Error fetching patient details:', error)
        if (isMounted) {
          setPatient(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPatient()

    return () => {
      isMounted = false
    }
  }, [patientId])

  return { patient, isLoading }
}

export default usePatientDetails

