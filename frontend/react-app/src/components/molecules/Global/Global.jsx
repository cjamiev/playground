import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../atoms/Modal';
import { loadSettings } from '../../pages/Settings/settingsActions';
import { createAlert } from '../../layout/Alert/alertActions';
import { closeGlobalModal, hideLoadingModal } from './globalActions';
import { SCGlobalModal, SCGlobalModalLoading, SCGlobalModalLoadingName } from './styles';

const ZERO = 0;
const ONE = 1;

const Global = () => {
  const dispatch = useDispatch();
  const { loadingQueue, modalQueue } = useSelector((state) => state.global);
  const props = modalQueue[ZERO] || {};

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  const close = () => {
    dispatch(closeGlobalModal(props.id));
  };

  if (loadingQueue.length) {
    const message = (
      <div>
        <SCGlobalModalLoading>Loading...</SCGlobalModalLoading>
        <SCGlobalModalLoadingName>{loadingQueue[ZERO]}</SCGlobalModalLoadingName>
      </div>
    );
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <SCGlobalModal>
        <Modal
          message={message}
          close={() => {
            dispatch(hideLoadingModal(loadingQueue[ZERO]));
          }}
        />
      </SCGlobalModal>
    );
  } else if (props.message) {
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <SCGlobalModal>
        <Modal close={close} {...props} />
      </SCGlobalModal>
    );
  }

  return null;
};

export default Global;
