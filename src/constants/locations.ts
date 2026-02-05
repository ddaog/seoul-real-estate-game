export interface Location {
    id: string;
    name: string;
    description: string;
    keywords: string[];
}

export const LOCATIONS: Location[] = [
    {
        id: "GANGNAM",
        name: "갱남 (Gangnam)",
        description: "대한민국 욕망의 용광로. 모두가 원하지만 아무나 입성할 수 없는 그곳.",
        keywords: ["대치동 학원가", "한강뷰", "재건축", "종부세", "발렛파킹"]
    },
    {
        id: "MAYONGSEONG",
        name: "마용성채 (Ma-Yong-Seong Stronghold)",
        description: "강북의 신흥 귀족들이 사는 성채. 끊임없이 갱남을 추격한다.",
        keywords: ["한강변", "재개발", "뉴타운", "젊은 부자", "힙플레이스"]
    },
    {
        id: "NODOGANG",
        name: "노도강림 (No-Do-Gang Rim)",
        description: "서민들의 최후 방어선이자 영끌족의 성지.",
        keywords: ["재건축 예비안전진단", "GTX 호재", "상계 주공", "베드타운"]
    },
    {
        id: "PANGYO",
        name: "판교 테크노밸리 (Silicon Valley of Korea)",
        description: "개발자들의 무덤이자 요람. 24시간 불이 꺼지지 않는 등대.",
        keywords: ["IT 대기업", "스톡옵션", "신분당선", "백화점 오픈런"]
    },
    {
        id: "GIMPO",
        name: "김포 골드라인 (Gimpo Gold Line)",
        description: "지옥철의 전설. 출퇴근 자체가 생존 게임.",
        keywords: ["호흡곤란", "압사 경고", "신도시", "서울 편입 이슈"]
    }
];
