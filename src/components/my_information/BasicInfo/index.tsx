import Select from 'react-select';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '../ListItem';
import CommonInput from '../../common/Input';
import InfoWrapper from '../InfoWrapper';
import RadioBox from '../../common/RadioBox';

export default function BasicInfo(props) {
  const { name, nation, gender, birth, phone, onChange } = props;
  const { t } = useTranslation();
  const inputStyles = { fontSize: 16 };
  return (
    <InfoWrapper title={t('myPage:basicInfo')} required>
      <ListItem title={t('myPage:name')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          value={name}
          maxLength={15}
          onChange={(v) => onChange({ name: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:nationality')}>
        <Select
          value={nation}
          placeholder={t('common:select')}
          options={[
            { label: t('common:select'), value: 'default' },
            { label: t('myPage:korea'), value: 'korea' },
            { label: t('myPage:vietnam'), value: 'vietnam' },
          ]}
          instanceId={useId()}
          onChange={(v) => onChange({ nation: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:gender')}>
        <RadioBox
          value={gender}
          options={[
            { label: t('posting:male'), value: 'male' },
            { label: t('posting:female'), value: 'female' },
          ]}
          onChange={(v) => onChange({ gender: v })}
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
          onChange={(v) => onChange({ birth: v })}
        />
      </ListItem>
      <ListItem title={t('posting:contact')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          type="phone"
          placeholder="000 0000 0000"
          value={phone}
          onChange={(v) => onChange({ phone: v })}
        />
      </ListItem>
    </InfoWrapper>
  );
}
