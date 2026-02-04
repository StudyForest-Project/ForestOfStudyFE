import React, { useState } from 'react';
import styles from './CreateStudy.module.css';
import { PrimaryButton } from '../PrimaryButton';
import bgImg1 from '@/assets/img/bg_img_1.jpg';
import bgImg2 from '@/assets/img/bg_img_2.jpg';
import bgImg3 from '@/assets/img/bg_img_3.jpg';
import bgImg4 from '@/assets/img/bg_img_4.jpg';
import selectIcon from '@/assets/icons/ic_bg_selected.svg';
import visibility_off from '@/assets/icons/ic_visibility_off.svg';
import visibility_on from '@/assets/icons/ic_visibility_on.svg';
import { createStudy } from '@/services';
import { useLocation, useNavigate } from 'react-router';
import useCrateStudyStore from '@/stores/useStudyFormStore';

export const CreateStudy = () => {
  const [selectedBgIndex, setSelectedBgIndex] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const { pathname } = useLocation();
  const formData = useCrateStudyStore((s) => s.formData);
  const setField = useCrateStudyStore((s) => s.setField);
  const resetFormData = useCrateStudyStore((s) => s.resetFormData);
  const nav = useNavigate();

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const isModify = pathname === '/studyModify';

  const handleSubmit = async () => {
    const studyData = {
      nickname: formData.nickname,
      title: formData.title,
      description: formData.description,
      backgroundImage: formData.backgroundImage,
      ...(isModify ? {} : { password: formData.password }),
    };

    const hasEmptyField = Object.values(studyData).some((field) => !field);
    const passwordMismatch =
      !isModify && formData.password !== formData.passwordVerify;

    if (hasEmptyField || passwordMismatch) {
      setShowErrors(true);
      return;
    }

    try {
      const response = await createStudy(studyData);
      const item = response.study;
      resetFormData();
      nav(`/studies/${item.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const backgrounds = [
    { type: 'color', value: '#E1EDDE' },
    { type: 'color', value: '#FFF1CC' },
    { type: 'color', value: '#E0F1F5' },
    { type: 'color', value: '#FDE0E9' },
    { type: 'image', value: bgImg1 },
    { type: 'image', value: bgImg2 },
    { type: 'image', value: bgImg3 },
    { type: 'image', value: bgImg4 },
  ];

  const handleBgSelect = (index) => {
    const isDeselecting = index === selectedBgIndex;
    setSelectedBgIndex(isDeselecting ? null : index);
    setField('backgroundImage', isDeselecting ? '' : backgrounds[index].value);
  };
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>스터디만들기</h2>
      <div className={styles.inputSection}>
        <p className={styles.label}>닉네임</p>
        <input
          type="text"
          className={styles.input}
          placeholder="닉네임을 입력해 주세요"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        {!formData.nickname && showErrors && (
          <p className={styles.errorMsg}>*닉네임을 입력해 주세요</p>
        )}
      </div>
      <div className={styles.inputSection}>
        <p className={styles.label}>스터디 이름</p>
        <input
          type="text"
          className={styles.input}
          name="title"
          placeholder="스터디 이름을 입력해 주세요"
          value={formData.title}
          onChange={handleChange}
        />
        {!formData.title && showErrors && (
          <p className={styles.errorMsg}>*스터디 이름을 입력해 주세요</p>
        )}
      </div>
      <div className={styles.inputSection}>
        <p className={styles.label}>소개</p>
        <textarea
          className={`${styles.input} ${styles.descriptionInput}`}
          placeholder="소개 멘트를 작성해 주세요"
          value={formData.description}
          name="description"
          onChange={handleChange}
        />
        {!formData.description && showErrors && (
          <p className={styles.errorMsg}>*소개 멘트를 작성해 주세요</p>
        )}
      </div>

      <div className={styles.bgSection}>
        <p className={styles.label}>배경을 선택해 주세요</p>
        <div className={styles.bgGrid}>
          {backgrounds.map((bg, index) => {
            const isSelected = selectedBgIndex === index;
            return (
              <div
                key={index}
                className={styles.bgItem}
                style={{
                  backgroundColor:
                    bg.type === 'color' ? bg.value : 'transparent',
                  backgroundImage:
                    bg.type === 'image' ? `url(${bg.value})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => handleBgSelect(index)}
              >
                {isSelected && (
                  <div className={styles.selectIcon}>
                    <img src={selectIcon} alt="선택됨" />
                  </div>
                )}
              </div>
            );
          })}
          {!formData.backgroundImage && showErrors && (
            <p className={styles.errorMsg}>*배경을 선택해 주세요</p>
          )}
        </div>
      </div>
      {!isModify && (
        <>
          <div className={styles.inputSection}>
            <p className={styles.label}>비밀번호</p>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="비밀번호를 입력해 주세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.visibilityButton}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <img
                  src={showPassword ? visibility_on : visibility_off}
                  alt="비밀번호 표시"
                />
              </button>
            </div>
            {!formData.password && showErrors && (
              <p className={styles.errorMsg}>*비밀번호를 입력해 주세요</p>
            )}
          </div>

          <div className={styles.inputSection}>
            <p className={styles.label}>비밀번호 확인</p>
            <div className={styles.passwordContainer}>
              <input
                type={showPasswordVerify ? 'text' : 'password'}
                className={styles.input}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={formData.passwordVerify}
                name="passwordVerify"
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.visibilityButton}
                onClick={() => setShowPasswordVerify(!showPasswordVerify)}
                tabIndex={-1}
              >
                <img
                  src={showPasswordVerify ? visibility_on : visibility_off}
                  alt="비밀번호 표시"
                />
              </button>
            </div>
            {!formData.passwordVerify && showErrors && (
              <p className={styles.errorMsg}>
                *비밀번호를 다시 한 번 입력해 주세요
              </p>
            )}
            {showErrors &&
              formData.passwordVerify &&
              formData.password !== formData.passwordVerify && (
                <p className={styles.errorMsg}>*비밀번호가 일치하지 않습니다</p>
              )}
          </div>
        </>
      )}

      <PrimaryButton className={styles.createBtn} onClick={handleSubmit}>
        {isModify ? '수정하기' : '만들기'}
      </PrimaryButton>
    </form>
  );
};
