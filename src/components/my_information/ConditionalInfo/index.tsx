import { useTranslation } from 'react-i18next';
import RadioBox from '../../common/RadioBox';
import { categoryType, residenceType as residenceTypes, postingConstant } from '../../../constant/constant';
import InfoWrapper from '../InfoWrapper';
import ListItem from '../ListItem';
import CommonInput from '../../common/Input';
import Editor from '../../common/Editor';

const { proficiency: proficiencyConst } = postingConstant.PostingThirdPartInfo;

export default function ConditionalInfo(props) {
  const { proficiency, career, careerDetail, residenceType, selfIntroduction, readOnly, onChange } = props;
  const { t } = useTranslation();
  const inputStyles = { fontSize: 16 };

  const proficiencyOptions = Object.values(proficiencyConst)
    .filter((skill) => skill !== 'koLangSkill')
    .map((value) => ({ value, label: t(`posting:${value}`) }));
  const careerOptions = Object.values(categoryType).map((value) => ({ value, label: t(`myPage:${value}`) }));
  const residenceOptions = Object.values(residenceTypes).map((value) => ({ value, label: t(`myPage:${value}`) }));
  return (
    <InfoWrapper title={t('myPage:careerInfo')} readOnly>
      <ListItem title={t('posting:koLangSkill')}>
        <RadioBox
          value={proficiency}
          options={proficiencyOptions}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ proficiency: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:experience')}>
        <RadioBox
          value={career}
          options={careerOptions}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ career: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:jobTasks')}>
        <CommonInput
          className="info__input"
          wrapperStyle={inputStyles}
          placeholder={t('myPage:jobTasksPlaceHolder')}
          value={careerDetail}
          maxLength={20}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ careerDetail: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:residenceType')}>
        <RadioBox
          value={residenceType}
          options={residenceOptions}
          column
          readOnly={readOnly}
          onChange={(v) => onChange?.({ residenceType: v })}
        />
      </ListItem>
      <ListItem title={t('myPage:selfIntro')} readOnly required>
        <Editor
          value={selfIntroduction}
          maxLength={500}
          readOnly={readOnly}
          onChange={(v) => onChange?.({ selfIntroduction: v })}
        />
      </ListItem>
    </InfoWrapper>
  );
}
