/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Search, 
  BookOpen, 
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Wefic_SERIES_DATA: Record<number, { title: string; author: string; color: string; initialRead?: boolean; imgUrl?: string }> = {
  1: { title: "파쇄", author: "구병모", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/117828174/XL" },
  2: { title: "마유미", author: "이희주", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/117828189/XL" },
  3: { title: "할매 떡볶이 레시피", author: "윤자영", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/117828197/XL" },
  4: { title: "북적대지만 은밀하게", author: "박소연", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/117828204/XL" },
  5: { title: "크리스마스이브의 방문객", author: "김기창", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/117828214/XL" },
  6: { title: "블루마블", author: "이종산", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/118397484/XL" },
  7: { title: "우주 대전의 끝", author: "곽재식", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/118397497/XL" },
  8: { title: "백 명 버튼", author: "김동식", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/118397512/XL" },
  9: { title: "물 밑에 계시리라", author: "배예람", color: "#363062", imgUrl: "https://image.yes24.com/goods/118397562/XL" },
  10: { title: "나의 미치광이 이웃", author: "이소호", color: "#F99417", imgUrl: "https://image.yes24.com/goods/118958460/XL" },
  11: { title: "나의 즐거운 육아 일기", author: "오한기", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/118958470/XL" },
  12: { title: "만조를 기다리며", author: "조예은", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/127101835/XL" },
  13: { title: "애니", author: "도진기", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/118958515/XL" },
  14: { title: "극동의 여자 친구들", author: "박솔뫼", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/119578127/XL" },
  15: { title: "마음 편해지고 싶은 사람들을 위한 워크숍", author: "정혜윤", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/119578146/XL" },
  16: { title: "10초는 영원히", author: "황모과", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/119578165/XL" },
  17: { title: "삼척, 불멸", author: "김희선", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/119578177/XL" },
  18: { title: "봇로스 리포트", author: "최정화", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/120182045/XL" },
  19: { title: "모델", author: "정해연", color: "#363062", imgUrl: "https://image.yes24.com/goods/120182643/XL" },
  20: { title: "환생꽃", author: "정이담", color: "#F99417", imgUrl: "https://image.yes24.com/goods/120182662/XL" },
  21: { title: "크리스마스 캐러셀", author: "문지혁", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/120182682/XL" },
  22: { title: "마르셀 아코디언 클럽", author: "김목인", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/121527760/XL" },
  23: { title: "앙심", author: "전건우", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/121527771/XL" },
  24: { title: "그림자 나비", author: "최양선", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/121527776/XL" },
  25: { title: "확률의 무덤", author: "이하진", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/121528043/XL" },
  26: { title: "감미롭고 간절한", author: "은모든", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/122441185/XL" },
  27: { title: "잠이 오나요", author: "이유리", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/122441205/XL" },
  28: { title: "이런, 우리 엄마가 우주선을 유괴했어요", author: "심너울", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/122441222/XL" },
  29: { title: "창신동 여자", author: "최현숙", color: "#363062", imgUrl: "https://image.yes24.com/goods/122441228/XL" },
  30: { title: "2학기 한정 도서부", author: "연여름", color: "#F99417", imgUrl: "https://image.yes24.com/goods/122849807/XL" },
  31: { title: "나의 여자 친구", author: "서미애", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/122849830/XL" },
  32: { title: "우리의 클라이밍", author: "김원영", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/122849837/XL" },
  33: { title: "현대적이라고 말할 수 없는 죽음들", author: "정지돈", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/122849850/XL" },
  34: { title: "첫사랑이 언니에게 남긴 것", author: "이서수", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/123382100/XL" },
  35: { title: "매듭 정리", author: "이경희", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/123382107/XL" },
  36: { title: "무지개나래 반려동물 납골당", author: "송경아", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/123382128/XL" },
  37: { title: "삼색도", author: "현호정", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/123382144/XL" },
  38: { title: "고유한 형태", author: "김현", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/124106122/XL" },
  39: { title: "무칭", author: "이민진", color: "#363062", imgUrl: "https://image.yes24.com/goods/124106100/XL" },
  40: { title: "더 나은 인간", author: "김이환", color: "#F99417", imgUrl: "https://image.yes24.com/goods/124106145/XL" },
  41: { title: "소녀는 따로 자란다", author: "안담", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/124106088/XL" },
  42: { title: "밥줄광대놀음", author: "조현아", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/124489026/XL" },
  43: { title: "새로고침", author: "김효인", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/124489113/XL" },
  44: { title: "고르디우스의 매듭을 자르면", author: "전헤진", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/124489132/XL" },
  45: { title: "제습기 다이어트", author: "김청귤", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/124489156/XL" },
  46: { title: "논터널링", author: "최의택", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/125084986/XL" },
  47: { title: "스페이스 M", author: "김유담", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/125084989/XL" },
  48: { title: "나름에게 가는 길", author: "전삼혜", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/125085002/XL" },
  49: { title: "오로라", author: "최진영", color: "#363062", imgUrl: "https://image.yes24.com/goods/125085021/XL" },
  50: { title: "단단하고 녹슬지 않는", author: "이혁진", color: "#F99417", imgUrl: "https://image.yes24.com/goods/125085046/XL" },
  51: { title: "영희와 제임스", author: "강화길", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/128849778/XL" },
  52: { title: "루카스", author: "이문영", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/128849780/XL" },
  53: { title: "인현왕후의 회빙환을 위하여", author: "현찬양", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/128849784/XL" },
  54: { title: "다다른 날들", author: "차현지", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/128849787/XL" },
  55: { title: "두더지 인간", author: "김성중", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/128849789/XL" },
  56: { title: "라비우와 링과", author: "김서해", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/130499525/XL" },
  57: { title: "0000", author: "임선우", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/130499627/XL" },
  58: { title: "바리", author: "듀나", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/130499706/XL" },
  59: { title: "불멸의 인절미", author: "한유리", color: "#363062", imgUrl: "https://image.yes24.com/goods/130499787/XL" },
  60: { title: "사랑과 연합 0장", author: "한정현", color: "#F99417", imgUrl: "https://image.yes24.com/goods/133292096/XL" },
  61: { title: "칠면조가 숨어 있어", author: "위수정", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/133292164/XL" },
  62: { title: "작가의 말", author: "천희란", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/133292182/XL" },
  63: { title: "창문", author: "정보라", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/133292193/XL" },
  64: { title: "그때는", author: "이주란", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/134873654/XL" },
  65: { title: "픈 것이다", author: "김보영", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/134873671/XL" },
  66: { title: "중국 앵무새가 있는 방", author: "이주혜", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/134873683/XL" },
  67: { title: "부오니시모, 나폴리", author: "정대건", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/134873701/XL" },
  68: { title: "화성과 창의의 시도", author: "김희재", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/138333289/XL" },
  69: { title: "담장 너머 버베나", author: "단요", color: "#363062", imgUrl: "https://image.yes24.com/goods/138333299/XL" },
  70: { title: "어떤 새의 이름을 아는 슬픈 너", author: "문보영", color: "#F99417", imgUrl: "https://image.yes24.com/goods/138333306/XL" },
  71: { title: "몸몸", author: "박서련", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/138333326/XL" },
  72: { title: "모두 일요일이야", author: "금정연", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/140037551/XL" },
  73: { title: "잡 인터뷰", author: "박이강", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/140037568/XL" },
  74: { title: "예감의 우주", author: "김나현", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/140037806/XL" },
  75: { title: "개구리가 되고 싶어", author: "김화진", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/140037834/XL" },
  76: { title: "수신인도 발신인도 아닌 씨씨", author: "권김현영", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/140199878/XL" },
  77: { title: "계화의 여름", author: "배명은", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/141193498/XL" },
  78: { title: "돈 안 쓰면 죽는 병", author: "이두온", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/141193511/XL" },
  79: { title: "새해 연습", author: "김지연", color: "#363062", imgUrl: "https://image.yes24.com/goods/141193522/XL" },
  80: { title: "사서 고생", author: "조우리", color: "#F99417", imgUrl: "https://image.yes24.com/goods/142968137/XL" },
  81: { title: "소란한 속삭임", author: "예소연", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/142968144/XL" },
  82: { title: "초인의 세계", author: "이장욱", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/142968153/XL" },
  83: { title: "우리가 열 번을 나고 죽을 때", author: "성해나", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/143786442/XL" },
  84: { title: "김용호", author: "장진영", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/143786497/XL" },
  85: { title: "아빠 소설", author: "이연숙", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/143786867/XL" },
  86: { title: "바보 같은 춤을 추자", author: "서이제", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/145602144/XL" },
  87: { title: "일단 믿는 마음", author: "권희진", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/145602229/XL" },
  88: { title: "사는 사람", author: "정이현", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/145602349/XL" },
  89: { title: "소도둑 성장기", author: "함윤이", color: "#363062", imgUrl: "https://image.yes24.com/goods/147627341/XL" },
  90: { title: "바르셀로나의 유서", author: "백세희", color: "#F99417", imgUrl: "https://image.yes24.com/goods/147627358/XL" },
  91: { title: "고백의 시대", author: "이현석", color: "#FF6B6B", imgUrl: "https://image.yes24.com/goods/147627367/XL" },
  92: { title: "엄마 몰래 피우는 담배", author: "임솔아", color: "#4D96FF", imgUrl: "https://image.yes24.com/goods/150157006/XL" },
  93: { title: "와이카노", author: "김유원", color: "#6BCB77", imgUrl: "https://image.yes24.com/goods/150157203/XL" },
  94: { title: "연고자들", author: "백온유", color: "#FFD93D", imgUrl: "https://image.yes24.com/goods/150157225/XL" },
  95: { title: "곰-사냥-인간", author: "김홍", color: "#92A9BD", imgUrl: "https://image.yes24.com/goods/152929480/XL" },
  96: { title: "공", author: "김유나", color: "#FF8E9E", imgUrl: "https://image.yes24.com/goods/152929227/XL" },
  97: { title: "그냥 두세요", author: "권혜영", color: "#7FB5FF", imgUrl: "https://image.yes24.com/goods/152929673/XL" },
  98: { title: "찰스 부코스키 타자기", author: "박지영", color: "#C3F8FF", imgUrl: "https://image.yes24.com/goods/160226460/XL" },
  99: { title: "추분", author: "신민", color: "#363062", imgUrl: "https://image.yes24.com/goods/160226826/XL" },
  100: { title: "셀붕이의 도", author: "이미상", color: "#F99417", imgUrl: "https://image.yes24.com/goods/160227261/XL" },
};

const IMAGE_BASE_URL = "https://your-image-source.com";

const generateWeficData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const info = Wefic_SERIES_DATA[id] || { title: "출간 예정", author: "위즈덤하우스", color: "#f0f0f0" };
    const finalImgUrl = info.imgUrl ? info.imgUrl : `${IMAGE_BASE_URL}/wefic_${id}.jpg`;

    return {
      id,
      ...info,
      imgUrl: finalImgUrl, 
      read: false,
      owned: false,
      wishlist: false,
      updatedAt: 0
    };
  });
};

type Book = ReturnType<typeof generateWeficData>[0];

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<'all' | 'read'>('all');

  // Initialize and Load from LocalStorage
  useEffect(() => {
    document.title = "Wefic checklist";
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem('Wefic-checklist17');
    if (saved) {
      setBooks(JSON.parse(saved));
    } else {
      setBooks(generateWeficData());
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('Wefic-checklist17', JSON.stringify(books));
    }
  }, [books]);

  const toggleStatus = (id: number) => {
    setBooks(prev => prev.map(book => {
      if (book.id === id) {
        const isChecking = !book.read;
        return { 
          ...book, 
          read: isChecking,
          updatedAt: isChecking ? Date.now() : 0 
        };
      }
      return book;
    }));
  };

  const stats = useMemo(() => {
    const readCount = books.filter(b => b.read).length;
    return { readCount };
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.id.toString().includes(searchQuery);
      
      if (filter === 'all') return matchesSearch;
      return matchesSearch && book.read; 
    });
  }, [books, searchQuery, filter]);

  return (
    <div className="min-h-screen pb-20 bg-[#fcfcfc]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Wefic Checklist</h1>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Series 001-100</p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="col-span-1 md:col-span-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-600">Reading Progress</span>
                <span className="text-3xl font-black text-gray-900">{stats.readCount}<span className="text-sm font-normal text-gray-400">/100</span></span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.readCount}%` }}
                  className="h-full bg-black rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by title, author or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>
          <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto overflow-x-auto">
            {(['all', 'read'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-white shadow-sm text-black' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                  {/* Book Cover */}
                  <div className="aspect-[150/220] w-full relative overflow-hidden flex items-center justify-center bg-gray-50">
                    {/* Actual Image */}
                    <img 
                      src={book.imgUrl} 
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover z-20 opacity-0 transition-opacity duration-500"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Fallback Placeholder */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                      style={{ backgroundColor: book.color + '15' }}
                    >
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{ 
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${book.color} 1px, transparent 0)`,
                          backgroundSize: '12px 12px'
                        }}
                      />
                      <span className="block text-[9px] font-black opacity-40 mb-1 tracking-tighter">Wefic {book.id.toString().padStart(3, '0')}</span>
                      <span className="block text-xs font-bold leading-tight line-clamp-3 mb-2" style={{ color: book.color }}>{book.title}</span>
                      <span className="block text-[9px] font-medium opacity-50">{book.author}</span>
                    </div>
                    
                    {/* Status Badges Overlay */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 z-30">
                      {book.read && <div className="p-1 bg-green-500 text-white rounded-full shadow-lg"><CheckCircle2 className="w-3 h-3" /></div>}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col flex-grow">
                    <div className="mb-3">
                      <h3 className="text-xs font-bold line-clamp-1 mb-0.5 text-gray-900">{book.title}</h3>
                      <p className="text-[10px] text-gray-500">{book.author}</p>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-auto pt-2 border-t border-gray-50">
                      <button 
                        onClick={() => toggleStatus(book.id)}
                        className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-xs ${
                          book.read 
                            ? 'bg-black text-white shadow-md' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {book.read ? '완독함' : '읽기 전'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Snapshot Zone */}
        <section className="mt-24 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-2 text-gray-900">
              <Sparkles className="text-orange-500" /> Wefic PICK
            </h2>
          </div>

          <div className="max-w-2xl mx-auto relative p-6 bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black leading-tight text-gray-900">MY Wefic<br/>COLLECTION</h3>
                  <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">Wisdom House Series</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Progress</p>
                  <p className="text-3xl font-black text-gray-900">{stats.readCount}%</p>
                </div>
              </div>

              <div className="flex-grow grid grid-cols-4 gap-2 mb-8">
                {books
                  .filter(b => b.read)
                  .sort((a, b) => (a.updatedAt || 0) - (b.updatedAt || 0)) 
                  .slice(0, 12)
                  .map((b, i) => (
                    <div key={i} className="aspect-[150/220] rounded-md overflow-hidden shadow-sm relative bg-gray-100">
                      <img 
                        src={b.imgUrl} 
                        alt={b.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover z-20 opacity-0 transition-opacity duration-300"
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <div className="w-full h-full flex items-center justify-center p-1 text-[6px] font-bold text-white text-center leading-tight z-0" style={{ backgroundColor: b.color }}>
                        {b.title}
                      </div>
                    </div>
                  ))}
                {Array.from({ length: Math.max(0, 12 - books.filter(b => b.read).length) }).map((_, i) => (
                  <div key={i} className="aspect-[150/220] rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">© 2026 Wefic Checklist Dashboard. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-gray-400 hover:text-black transition-colors"><BookOpen className="w-5 h-5" /></div>
        </div>
      </footer>
    </div>
  );
}
