import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 스토어에서 관리할 상태(State)의 타입 정의
type State = {
  isLoaded: boolean; // 세션이 로드(확인)되었는지 여부
  session: Session | null; // 현재 로그인된 사용자 세션 (없으면 null)
};

// 초기 상태값 정의
const initialState = {
  isLoaded: false, // 아직 세션이 로드되지 않은 상태
  session: null, // 로그인 전이므로 세션 없음
} as State;

// Zustand 스토어 생성
// combine()은 initialState와 상태를 변경하는 액션을 합쳐서 하나의 store로 만들어줌
const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      // 액션(action): 상태(state)를 변경하는 함수들을 모아둔 객체
      action: {
        // 세션을 갱신하는 함수. 로그인 성공 시나, 로그아웃 시 호출됨
        setSession: (session: Session | null) => {
          // Zustand의 set()으로 상태 변경
          // 세션이 변경되면 isLoaded도 true로 설정하여
          // 세션 로딩이 완료되었음을 표시함
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

// 현재 로그인된 세션(Session) 정보를 가져오는 훅
export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};
//  세션이 로드(확인)되었는지 여부를 가져오는 훅
export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

// 세션을 갱신(로그인/로그아웃)하는 액션을 가져오는 훅
export const useSetSession = () =>{
    const setSession = useSessionStore((store) => store.action.setSession)
    return setSession

}
