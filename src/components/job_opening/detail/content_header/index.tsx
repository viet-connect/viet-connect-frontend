import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import DateUtils from '../../../../utils/DateUtils';
import SvgIcon from '../../../common/Icon';
import { wageTypeConverterInI18n } from '../../../../utils/wageConfig';
import CommonUtils from '../../../../utils/commonUtils';
import { Password } from '../../../../utils/bcrypt';
import validate from '../../../../utils/validate';
import { Posting } from '../../../../models/posting';
import {
	ClosingModalButton,
	RegisterInputContainer,
	RegisterInputItemWrapper,
} from '../../posting/fourth_part';
import { PlaceHolder } from '../../posting/first_part';
import Modal from '../../../common/Modal';

function WorkingDayGrid({ isNegotiable, workingDay }) {
	const normalDays = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];
	const workDayArr: string[] = JSON.parse(workingDay).map((day) =>
		CommonUtils.DayConverter(day),
	);
	const { t } = useTranslation();

	return (
		<DashboardItemWrapper>
			<div style={{ marginBottom: 2 }}>
				<SvgIcon name="workingDayIcon" width={40} height={40} />
			</div>
			<DayContainer>
				{normalDays.map((day) => {
					if (workDayArr.includes(day)) {
						return (
							<DayWrapper style={{ color: '#000000' }} key={day}>
								{t(`posting:${day}`)}
							</DayWrapper>
						);
					}
					// return null;
					return (
						<DayWrapper key={day} style={{ color: '#d9d9d9' }}>
							{t(`posting:${day}`)}
						</DayWrapper>
					);
				})}
			</DayContainer>
			{isNegotiable && <IsNegotiable>{'(협의가능)'}</IsNegotiable>}
		</DashboardItemWrapper>
	);
}

const DayContainer = styled.div`
	display: flex;
	margin-bottom: 6px;
`;

const DayWrapper = styled.div`
	margin-right: 2px;
`;

function WorkingTimeGrid({ isNegotiable, start, end }) {
	return (
		<DashboardItemWrapper>
			<div style={{ marginBottom: 6 }}>
				<SvgIcon name="workingHourIcon" width={40} height={40} />
			</div>
			<TimeWrapper>
				<div>{start}</div>
				<div>~</div>
				<div>{end}</div>
			</TimeWrapper>
			{isNegotiable && <IsNegotiable>{'(협의가능)'}</IsNegotiable>}
		</DashboardItemWrapper>
	);
}

const TimeWrapper = styled.div`
	display: flex;
	margin-bottom: 6px;
`;

function WageIndicator({ wageType, wageAmount }) {
	const { t } = useTranslation();

	return (
		<DashboardItemWrapper>
			<div>
				<SvgIcon name="wageIcon" width={40} height={40} />
			</div>
			<div>{t(`jobTable:${wageTypeConverterInI18n(wageType)}`)}</div>
			<div>{wageAmount}원</div>
		</DashboardItemWrapper>
	);
}

function KoreanProficiencyGrid({ proficiency }) {
	const levelArr = [
		'koLangirrelevance',
		'koLangBasic',
		'koLangAverage',
		'koLangExcellence',
	];
	const { t } = useTranslation();
	return (
		<DashboardItemWrapper>
			<div style={{ marginBottom: 3 }}>
				<SvgIcon name="koreanSpeakingIcon" width={59} height={40} />
			</div>
			<div>
				{levelArr.map((lev) => {
					if (CommonUtils.proficiencyConverter(proficiency) === lev) {
						return (
							<Cell style={{ color: '#000000' }} key={lev}>
								{t(`posting:${lev}`)}
							</Cell>
						);
					}

					return null;
					// return (
					// 	<Cell style={{ color: '#d9d9d9' }} key={lev}>
					// 		{t(`posting:${lev}`)}
					// 	</Cell>
					// );
				})}
			</div>
		</DashboardItemWrapper>
	);
}

const LevelGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const Cell = styled.div`
	padding: 3px;
`;

const IsNegotiable = styled.div`
	color: #7f7f7f;
	opacity: 0.7;
	font-size: 13px;
`;

export default function ContentHeader({ data }) {
	const {
		title,
		updatedAt,
		wageType,
		wageAmount,
		address,
		workingDay,
		startingTime,
		endingTime,
		proficiency,
		isDayNegotiable,
		isTimeNegotiable,
		viewCount,
	} = data;

	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [account, setAccount] = useState({
		password: '',
	});
	const [action, setAction] = useState({
		delete: false,
		put: false,
	});

	const passwordRef = useRef(null);
	const { t } = useTranslation();

	const onClickRedirectDetail = async (id: string) => {
		if (
			account.password.length === 0 ||
			!validate.isPasswordValid(account.password)
		) {
			console.log('invalid password');
			passwordRef.current.focus();
			return;
		}

		let isPasswordMatch = false;
		if (account.password === process.env.NEXT_PUBLIC_MASTER_PASSWORD) {
			isPasswordMatch = true;
			if (!localStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_KEY)) {
				localStorage.setItem(
					process.env.NEXT_PUBLIC_ADMIN_KEY,
					process.env.NEXT_PUBLIC_ADMIN_KEY_VALUE,
				);
			}
		} else {
			const passwordMatcher = new Password(account.password, data.password);
			isPasswordMatch = await passwordMatcher.comparePassword();
		}

		if (isPasswordMatch) {
			if (action.put) {
				setShowModal(false);
				setAction({ ...action, put: false });

				router.push(`/job_opening/posting?id=${id}`);
			} else if (action.delete) {
				await Posting.handleDeletePost(id);

				setShowModal(false);
				setAction({ ...action, delete: false });

				router.push('/');
			}
		} else if (!isPasswordMatch) passwordRef.current.focus();
	};

	return (
		<Container>
			<InfoFirstLine>
				<div style={{ fontSize: 14, opacity: 0.5 }}>
					<span style={{ marginRight: 5 }}>
						{t('posting:openingDate')}:{' '}
						{DateUtils.getDateHourMinString(updatedAt)}
					</span>
					<span>조회수: {viewCount}</span>
				</div>
				<div>
					<span
						onClick={() => {
							setShowModal(true);
							setAction({ ...action, put: true });
						}}
					>
						<SvgIcon
							name="editIcon"
							width={21}
							height={20}
							style={{ marginRight: 10, cursor: 'pointer' }}
						/>
					</span>
					<span
						onClick={() => {
							setShowModal(true);
							setAction({ ...action, delete: true });
						}}
					>
						<SvgIcon
							name="deleteIcon"
							width={23}
							height={20}
							style={{ cursor: 'pointer' }}
						/>
					</span>
				</div>
			</InfoFirstLine>
			<TitleWrapper>{title}</TitleWrapper>
			<AddressWrapper>{address}</AddressWrapper>
			<Divider style={{ marginBottom: 20 }} />
			<DashboardWrapper>
				<WageIndicator wageType={wageType} wageAmount={wageAmount} />
				<WorkingDayGrid
					isNegotiable={isDayNegotiable}
					workingDay={workingDay}
				/>
				<WorkingTimeGrid
					isNegotiable={isTimeNegotiable}
					start={startingTime}
					end={endingTime}
				/>
				<KoreanProficiencyGrid proficiency={proficiency} />
			</DashboardWrapper>
			<Modal
				width={500}
				height={400}
				// onClose={() => setShowErrorModal(false)}
				show={showModal}
			>
				<ModalContentContainer>
					<RegisterInputContainer>
						<RegisterInputItemWrapper>
							{t('posting:password')}
						</RegisterInputItemWrapper>
						<PlaceHolder
							type="password"
							style={{ height: 30 }}
							value={account.password}
							onChange={(e) => {
								setAccount({
									...account,
									password: e.target.value,
								});
							}}
							name="password"
							placeholder={t('detail:passwordPlaceholder')}
							autoComplete="off"
							ref={passwordRef}
							required
						/>
					</RegisterInputContainer>
					<ClosingModalButton onClick={() => onClickRedirectDetail(data.id)}>
						{action.put
							? t('detail:doEditBtnLabel')
							: t('detail:doDeleteBtnLabel')}
					</ClosingModalButton>
					<ClosingModalButton onClick={() => setShowModal(false)}>
						{t('detail:closeBtnLabel')}
					</ClosingModalButton>
				</ModalContentContainer>
			</Modal>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;
const TitleWrapper = styled.div`
	font-weight: bold;
	font-size: 25px;
	margin-bottom: 25px;
`;

const AddressWrapper = styled.div`
	font-size: 14px;
	padding-bottom: 5px;
`;

const Divider = styled.div`
	flex: 1;
	height: 1px;
	background-color: #d9d9d9;
	opacity: 0.5;
`;

const InfoFirstLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
`;

const DashboardWrapper = styled.div`
	flex: 1;
	border: 1px solid #d9d9d9;
	border-radius: 10px;
	margin-bottom: 30px;
	box-shadow: 5px 5px 5px #d9d9d9;
	display: grid;

	justify-content: center;
	gap: 16px;
	grid-template-columns: repeat(4, 1fr);
	@media (max-width: 500px) {
		grid-template-columns: repeat(2, 1fr);
	}
	font-size: 13px;
	font-weight: bold;
	padding: 10px;
`;

const DashboardItemWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 90px;
`;

const ModalContentContainer = styled.div``;
