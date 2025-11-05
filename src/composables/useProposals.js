import { useFirestore } from './useFirestore'

export const useProposals = () => {
  const {
    documents: proposals,
    loading,
    error,
    addDocument,
    getDocuments
  } = useFirestore('proposals')

  const loadProposals = async () => {
    return await getDocuments('createdAt', 'desc')
  }

  const saveProposal = async (proposalData) => {
    return await addDocument(proposalData)
  }

  return {
    proposals,
    loading,
    error,
    loadProposals,
    saveProposal
  }
}
