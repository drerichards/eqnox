import styled from 'styled-components';

export const Controls = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    background: #1e293b; // or your theme background
    padding: 1rem;
`;

const SelectBase = styled.select`
    appearance: none;
    background: rgba(30, 41, 59, 0.6);
    color: white;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.1),
        0 4px 16px -8px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 0.75rem) center;
    min-width: 160px;

    &:hover {
        background-color: rgba(30, 41, 59, 0.7);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 8px 24px -8px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
    }

    &:focus {
        outline: none;
        border-color: rgba(59, 130, 246, 0.5);
        box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 8px 24px -8px rgba(0, 0, 0, 0.25),
            0 0 0 3px rgba(59, 130, 246, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    option {
        background: #1e293b;
        color: white;
        padding: 8px;
    }
`;

export const LimitSelect = styled(SelectBase)`
    min-width: 140px;
`;

export const SortSelect = styled(SelectBase)`
    min-width: 180px;
`;

export const SortOrderSelect = styled(SelectBase)`
    min-width: 200px;
`;
