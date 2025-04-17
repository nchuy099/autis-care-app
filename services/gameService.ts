import { db } from '../config/config';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export interface GameResult {
    userId: string;
    gameType: string;
    score: number;
    moves: number;
    time: number;
    date: Date;
}

export const saveGameResult = async (result: GameResult) => {
    try {
        const docRef = await addDoc(collection(db, 'gameResults'), {
            ...result,
            date: new Date(result.date)
        });
        return docRef.id;
    } catch (error) {
        throw error;
    }
};

export const getUserGameResults = async (userId: string): Promise<GameResult[]> => {
    try {
        const q = query(
            collection(db, 'gameResults'),
            where('userId', '==', userId),
            orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                userId: data.userId,
                gameType: data.gameType,
                score: data.score,
                moves: data.moves,
                time: data.time,
                date: data.date.toDate()
            } as GameResult;
        });
    } catch (error) {
        throw error;
    }
};

export const getGameStatistics = async (userId: string) => {
    try {
        const results = await getUserGameResults(userId);
        const totalGames = results.length;
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        const totalMoves = results.reduce((sum, result) => sum + result.moves, 0);
        const totalTime = results.reduce((sum, result) => sum + result.time, 0);

        return {
            totalGames,
            averageScore: totalGames > 0 ? totalScore / totalGames : 0,
            averageMoves: totalGames > 0 ? totalMoves / totalGames : 0,
            averageTime: totalGames > 0 ? totalTime / totalGames : 0
        };
    } catch (error) {
        throw error;
    }
}; 