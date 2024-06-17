import Select from 'react-select';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '../ListItem';
import CommonInput from '../../common/Input';
import InfoWrapper from '../InfoWrapper';
import RadioBox from '../../common/RadioBox';

export default function BasicInfo(props) {
  const { name, nation, gender, birth, phone, readOnly, onChange } = props;
  const { t } = useTranslation();
  const inputStyles = { fontSize: 16 };
  const nationOptions = [
    { label: t('common:select'), value: 'default' },
    { label: t('myPage:korea'), value: 'korea' },
    { label: t('myPage:vietnam'), value: 'vietnam' },
  ];
  return (
    <InfoWrapper title={t('myPage:basicInfo')} readOnly required>
      <ListItem title={t('myPage:name')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          value={name}
          maxLength={15}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ name: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:nationality')}>
        <Select
          value={nationOptions.find(({ value }) => value === nation) ?? null}
          placeholder={t('common:select')}
          options={nationOptions}
          instanceId={useId()}
          menuIsOpen={!readOnly}
          onChange={({ value }) => onChange?.({ nation: value })}
        />
      </ListItem>
      <ListItem title={t('myPage:gender')}>
        <RadioBox
          value={gender}
          options={[
            { label: t('posting:male'), value: 'male' },
            { label: t('posting:female'), value: 'female' },
          ]}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ gender: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:dateOfBirth')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          type="date"
          placeholder="1990. 00. 00"
          value={birth}
          maxLength={10}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ birth: v })}
        />
      </ListItem>
      <ListItem title={t('posting:contact')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          type="phone"
          placeholder="000 0000 0000"
          value={phone}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ phone: v })}
        />
      </ListItem>
    </InfoWrapper>
  );
}
