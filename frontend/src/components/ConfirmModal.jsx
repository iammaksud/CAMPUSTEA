function ConfirmModal({
  show,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  confirmVariant = 'danger', // 'danger' | 'tea'
  onCancel,
  onConfirm,
}) {
  if (!show) return null

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content tea-card border-0">
            <div className="modal-body p-4 text-center">
              <i
                className="bi bi-exclamation-triangle-fill fs-2 d-block mb-2"
                style={{ color: 'var(--tea-danger)' }}
              ></i>
              <h6 className="mb-2">{title}</h6>
              <p className="text-soft small mb-4">{message}</p>
              <div className="d-flex gap-2 justify-content-center">
                <button type="button" className="btn btn-outline-tea btn-sm" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={'btn btn-sm ' + (confirmVariant === 'danger' ? 'btn-tea' : 'btn-tea')}
                  style={confirmVariant === 'danger' ? { backgroundColor: 'var(--tea-danger)', borderColor: 'var(--tea-danger)' } : undefined}
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default ConfirmModal
