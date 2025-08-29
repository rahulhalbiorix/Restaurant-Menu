import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

export const useCategoryConfirm = () => {
  const confirm = useConfirm()
  const toast = useToast()

  const confirmDelete = (options: { accept: () => void }) => {
    confirm.require({
      message: 'Do you want to delete this Record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectProps: {
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        severity: 'danger',
        label: 'Delete',
      },
      accept: () => {
        options.accept()

        toast.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record successfully deleted',
          life: 3000,
        })
      },
      reject: () => {
        toast.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        })
      },
    })
  }

  return { confirmDelete }
}
