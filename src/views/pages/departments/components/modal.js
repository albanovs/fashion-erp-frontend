import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CContainer } from '@coreui/react';

export const UniversalModal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Подтвердить', cancelText = 'Отменить' }) => {
    return (
        <CModal center visible={isOpen} onClose={onClose}>
            <CModalHeader>
                <h5>{title}</h5>
            </CModalHeader>
            <CModalBody>
                {children}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    {cancelText}
                </CButton>
                <CButton color="primary" onClick={onConfirm}>
                    {confirmText}
                </CButton>
            </CModalFooter>
        </CModal>
    );
};