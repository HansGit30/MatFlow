import {
    AlertTriangle,
  } from "lucide-react"
  
  import Button from "./Button"
  import Modal from "./Modal"
  
  interface ConfirmDialogProps {
    open: boolean
    title?: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
  }
  
  export default function ConfirmDialog({
    open,
    title = "Confirmar acción",
    message,
    onConfirm,
    onCancel,
    loading = false,
  }: ConfirmDialogProps) {
    return (
      <Modal
        open={open}
        onClose={onCancel}
        title={title}
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle
              size={24}
              className="text-red-600"
            />
          </div>
  
          <p className="mt-4 text-sm text-slate-600">
            {message}
          </p>
  
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
            >
              Cancelar
            </Button>
  
            <Button
              variant="danger"
              onClick={onConfirm}
              loading={loading}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    )
  }