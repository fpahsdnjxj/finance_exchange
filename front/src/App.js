import React, { useState, useEffect } from 'react';
import './App.css';
import ReactCountryFlag from "react-country-flag";

import tossCard from './assets/toss_card.png'; 
import travelPayCard from './assets/travel_pay_card.png'; 
import hana from './assets/hana.png';
// import axios from 'axios';

import Exchange from './components/Exchange';
import DropdownAdd from './components/DropdownAdd';
import CountryDropdown from './components/CountryDropdown';
import Popup from './components/Popup';
/*
const countries = [
  "미국 달러", "아랍에미리트 디르함", "호주 달러", "바레인 디나르", "브루나이 달러",
  "캐나다 달러", "스위스 프랑", "위안화", "덴마아크 크로네", "유로", "영국 파운드",
  "홍콩 달러", "인도네시아 루피아", "일본 옌", "한국 원", "쿠웨이트 디나르",
  "말레이지아 링기트", "노르웨이 크로네", "뉴질랜드 달러", "사우디 리 얄",
  "스웨덴 크로나", "싱가포르 달러", "태국 바트"
];
*/

const Banks = [
  "하나은행", "KDB산업은행", "전북은행", "한국씨티은행", "NH농협은행", "신한은행",
  "KB국민은행", "IBK기업은행", "BNK경남은행", "제주은행", "광주은행",
  "BNK부산은행", "iM뱅크", "SC제일은행", "우리은행", "Sh수협은행"
];

const airportBanks = ["하나은행", "국민은행", "우리은행", "신한은행"];

const currencyOptions = [
  { value: "USD", label: "미국", flag: "US" },
  { value: "EUR", label: "유럽", flag: "EU" },
  { value: "JPY", label: "일본", flag: "JP"},
  { value: "KRW", label: "한국", flag: "KR" },  
  
];

const currencySymbols = {
  USD: "$",
  EUR: "€",
  KRW: "₩",
  JPY: "¥",
};

const CurrencyCalculator = () => {
  const [selectedLocation, setSelectedLocation] = useState("일반영업점");
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [popupContent, setPopupContent] = useState(null);
  const [isExpanded, setIsExpanded] = useState([false, false]);  

const openPopup = (card) => {
  setPopupContent(card.detailedBenefits);
  setIsExpanded([false, false]);
};

const closePopup = () => {
  setPopupContent(null);
  setIsExpanded([false, false]);
};

  const discountRate = 100;

  const cards = [
    {
      image: tossCard,
      name: "토스 카드",
      company: "토스",
      benefits: "• 토스 통장 개설 필수\n• 토스 통장 입금액만큼 사용 가능",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true, 
      },
    },
    {
      image: travelPayCard,
      name: "트래블 페이 충전카드",
      company: "트래블월렛",
      benefits: "• 트래블 통장 개설 필수\n• 미국 미니스톱 이용 시 5% 청구 할인",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true,
      },
    },
    {
      image: tossCard,
      name: "토스 카드",
      company: "토스",
      benefits: "• 토스 통장 개설 필수\n• 토스 통장 입금액만큼 사용 가능",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true, 
      },
    },
    {
      image: travelPayCard,
      name: "트래블 페이 충전카드",
      company: "트래블월렛",
      benefits: "• 트래블 통장 개설 필수\n• 미국 미니스톱 이용 시 5% 청구 할인",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true,
      },
    },
    {
      image: tossCard,
      name: "토스 카드",
      company: "토스",
      benefits: "• 토스 통장 개설 필수\n• 토스 통장 입금액만큼 사용 가능",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true, 
      },
    },
    {
      image: travelPayCard,
      name: "트래블 페이 충전카드",
      company: "트래블월렛",
      benefits: "• 트래블 통장 개설 필수\n• 미국 미니스톱 이용 시 5% 청구 할인",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true,
      },
    },
    {
      image: tossCard,
      name: "토스 카드",
      company: "토스",
      benefits: "• 토스 통장 개설 필수\n• 토스 통장 입금액만큼 사용 가능",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true, 
      },
    },
    {
      image: travelPayCard,
      name: "트래블 페이 충전카드",
      company: "트래블월렛",
      benefits: "• 트래블 통장 개설 필수\n• 미국 미니스톱 이용 시 5% 청구 할인",
      detailedBenefits: {
        title: "트래블로그 체크 카드",
        card: "하나 카드",
        description: "• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n• 해외 가맹점 수수료 면제\n",
        image: hana,
        features1: [
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",
          "해외 ATM 출금 수수료 면제",       
        ],
        features2: [
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",
          "해외 편의점 이용 시 5% 청구 할인",      
        ],
        hasToggle: true,
      },
    },
  ];

  const formatKRW = (amount) => {
    const number = parseInt(amount, 10);
    if (isNaN(number) || number === 0) return "0";
  
    const cho = Math.floor(number / 1000000000000);
    const remainder1 = number % 1000000000000;
    const uk = Math.floor(remainder1 / 100000000);
    const remainder2 = remainder1 % 100000000;
    const man = Math.floor(remainder2 / 10000);
    const remainder3 = remainder2 % 10000;
    const chun = Math.floor(remainder3 / 1000);
    const rest = remainder3 % 1000;
  
    let result = "";
    if (cho > 0) result += `${cho}조 `;
    if (uk > 0) result += `${uk}억 `;
    if (man > 0) result += `${man}만 `;
    if (chun > 0) result += `${chun}천 `;
    if (rest > 0 || (man === 0 && chun === 0)) result += `${rest}`;
    return result.trim();
  };

  const RealTimeClock = () => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
  
      return `ⓘ ${year}.${month}.${day} ${hours}:${minutes} 기준`;
    };
  
    return (
      <div style={{ fontSize: "11px", fontWeight: "100", textAlign: "left", paddingLeft: "40px", color: "#444" }}>
        {formatTime(time)}
      </div>
    );
  };  

  return (
    <div className='container'>
      <div className='top-container exchange-rate-calculator'>
        <h2>기준 환율 계산기</h2>
        <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    ></div>
    <div>{RealTimeClock()}</div>
      <div style={{ marginTop: "-25px", marginBottom: "-15px"}}>{Exchange()}</div>
      <div style={{ fontSize: "11px", fontFamily: "sans-serif", textAlign: 'center', color: "#555" }}>기준 환율 계산기는 단순 참고용으로 위 계산 결과는 우대율에 따른 환 차이는 고려되지 않았습니다.</div>
      </div>
    <div className='bottom-container'>
        <div className='left-box exchange-rate-calculator'>
          <h2>은행별 환율 계산기</h2>
          <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    ></div>
          <div style={{ marginBottom: "20px" }}>
            {[
              "일반영업점", "인천공항점"
            ].map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: selectedLocation === location ? "#c4c4c4" : "#ededed",
                  color: "black",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: 13
                }}
              >
                {location}
              </button>
            ))}
          </div>

          <table>
            <tbody>
              <tr>
                <td className="under">{selectedLocation === "일반영업점" ? "은행" : "공항 은행"}</td>
                <td style={{borderRight: "none"}}>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled>{selectedLocation === "일반영업점" ? "은행" : "공항 은행"}</option>
                    {(selectedLocation === "일반영업점" ? Banks : airportBanks).map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </td>
              </tr>
              
              <tr>
                <td className="under">환전 화폐</td>
                <td style={{borderRight: "none"}}>
                <select 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ fontSize: 12 }}
                >
                <option value="" disabled>화폐 선택</option>
                {currencyOptions.map((currency, index) => (
                <option key={index} value={currency.value}>
                  {currency.label} ({currency.value})
                </option>
                ))}
                </select>
                </td>
              </tr>
              <tr>
                <td className="under">조건 선택</td>
                <td style={{borderRight: "none"}}>
                  <DropdownAdd />
                </td>
              </tr>
              <tr>
              <td className="under">환전 금액</td>
              <td style={{ borderRight: "none" }}>
              <div className="input-bank">
      <input
        type="text"
        value={exchangeAmount}
        onChange={(e) => setExchangeAmount(e.target.value)}
        style={{ width: "90%" }}
        placeholder="환전할 원화를 입력하세요"
      />
      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "5px", marginRight: "25px",  textAlign: 'right' }}>
        {formatKRW(exchangeAmount)}원
      </div>
    </div>
              </td>
            </tr>
            <tr>
              <td className="under">최대 우대 적용 환율</td>
              <td style={{ borderRight: "none" }}>
              <div
                  className="input-bankch"
                  data-currency-symbol={currencySymbols[selectedCurrency]}                 
                >
                  <input type="text" value={discountRate || 0} disabled style={{ width: "90%" }} />
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className='right-box exchange-rate-calculator'>
          <h2>카드별 환율 계산기</h2>
          <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <div
            style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflow: "visible",
            width: "100%",
            margin: "0 auto",
            height: "40px",
          }}
          >
          <div
            style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: 14,
          }}
          >
          기준 국가
          </div>

            <div
              style={{
              display: "flex",
              alignItems: "center",
              borderLeft: "1px solid #ccc",
              paddingLeft: "20px",
              marginLeft: "0px",
              flex: 1, 
              }}
              >
              <ReactCountryFlag
                countryCode={selectedCountry}
                svg
                style={{ width: 20, height: 15, marginRight: "10px" }}
              />
              <CountryDropdown
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}                
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <table className="card-table">
  <thead>
    <tr>
      <th style={{borderTopLeftRadius: '20px',}}></th>
      <th>카드명(카드사)</th>
      <th>조건 및 혜택</th>
      <th style={{borderTopRightRadius: '20px',}}>환전 금액</th>
    </tr>
  </thead>
  <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>
                <img src={card.image} alt={card.name} className="card-image" />
              </td>

              <td
                className="benefits-cell"
                onClick={() => openPopup(card)}>{card.name}
                <br />
                <div style={{ fontSize: "11px" }}>({card.company})</div>
              </td>

              <td style={{ textAlign: "left" }}>
                <div style={{ whiteSpace: "pre-wrap" }}>{card.benefits}</div>
              </td>

              <td>
                <span>
                  {(!exchangeAmount || exchangeAmount === "")
                    ? "0"
                    : exchangeAmount.toString().length > 10
                    ? exchangeAmount.toString().substring(0, 10) + "..."
                    : exchangeAmount}
                </span>{" "}
                ₩ ({discountRate})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupContent && (
      <Popup 
      popupContent={popupContent} 
      closePopup={closePopup} 
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded} 
      />
      )}
        </div>
      </div></div>
  );
};

export default CurrencyCalculator;


