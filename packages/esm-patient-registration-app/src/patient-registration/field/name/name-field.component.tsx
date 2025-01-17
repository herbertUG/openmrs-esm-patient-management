import React, { useCallback, useContext } from 'react';
import styles from '../field.scss';
import { Input } from '../../input/basic-input/input/input.component';
import { PatientRegistrationContext, useFieldConfig } from '../../patient-registration-context';
import { useTranslation } from 'react-i18next';
import { ExtensionSlot } from '@openmrs/esm-framework';

export const NameField = () => {
  const { t } = useTranslation();
  const { setCapturePhotoProps, currentPhoto } = useContext(PatientRegistrationContext);

  const onCapturePhoto = useCallback((dataUri: string, photoDateTime: string) => {
    if (setCapturePhotoProps) {
      setCapturePhotoProps({
        imageData: dataUri,
        dateTime: photoDateTime,
      });
    }
  }, []);

  const fieldConfigs = useFieldConfig('name');

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('fullNameLabelText', 'Full Name')}</h4>
      <div className={styles.grid}>
        <Input id="givenName" name="givenName" labelText={t('givenNameLabelText', 'Given Name')} light />
        <ExtensionSlot
          extensionSlotName="capture-patient-photo-slot"
          state={{ onCapturePhoto, initialState: currentPhoto }}
        />
        {fieldConfigs.displayMiddleName && (
          <Input id="middleName" name="middleName" labelText={t('middleNameLabelText', 'Middle Name')} light />
        )}
        <Input id="familyName" name="familyName" labelText={t('familyNameLabelText', 'Family Name')} light />
      </div>
    </div>
  );
};
