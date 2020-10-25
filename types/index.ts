export type ContextThemeType = {
    themeState: boolean;
    setThemeState?: (state: boolean) => void;
};

// export type ContextTodoType = {
//     todoContext: {
//         id: string | undefined;
//         title: string | undefined;
//         status: string | undefined;
//         completed: boolean;
//         date?: Date | undefined;
//         rate?: number | undefined;
//     };
//     setTodosContext?: (todos: any | undefined) => unknown;
// };

export const Status = {
    0: 'unwichtig',
    1: 'nicht so wichtig',
    2: 'wichtig',
    3: 'sehr wichtig',
    4: 'dringlich',
    5: 'sehr dringlich',
};

export enum FilterBy {
    all = 'all',
    open = 'open',
    done = 'done',
}

export type ReturnValueRating = {
    readonly stars: number;
    readonly id: string;
};

export type EmailFormTyes = {
    email: string;
    password: string;
    isLoading: boolean;
    error: string;
    isLoggedIn?: boolean;
};
