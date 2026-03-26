import { useCallback } from 'react'
import settingsStore from '@/features/stores/settings'
import { isMultiModalModel, defaultModels } from '@/features/constants/aiModels'
import { AIService } from '@/features/constants/settings'

export const useAIServiceHandlers = () => {
  const updateMultiModalModeForModel = useCallback(
    (service: AIService, model: string) => {
      const currentState = settingsStore.getState()

      // カスタムモデルの場合は、ユーザーの設定を尊重してマルチモーダルモードを変更しない
      if (currentState.customModel) {
        return
      }

      if (!isMultiModalModel(service, model)) {
        settingsStore.setState({
          multiModalMode: 'never',
        })
      } else if (currentState.multiModalMode === 'never') {
        settingsStore.setState({
          multiModalMode: 'always',
        })
      }
    },
    []
  )

  const handleAIServiceChange = useCallback((newService: AIService) => {
    const selectedModel = defaultModels[newService]
    const currentState = settingsStore.getState()

    // 排他ルールはミドルウェアが自動適用する
    settingsStore.setState({
      selectAIService: newService,
      selectAIModel: selectedModel,
      multiModalMode: currentState.multiModalMode,
    })
  }, [])

  return {
    updateMultiModalModeForModel,
    handleAIServiceChange,
  }
}
