import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../core/config.js';

export const encodeSHA256 = (data) => {
    return createHash('sha256').update(data).digest('hex');
};

export const generateToken = (trackId, score) => {
    const token = jwt.sign({trackId : encodeSHA256(trackId), answerKey : score}, config.APP_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

export const decodeToken = (token) => {
    try {
        const verifiedPayload = jwt.verify(token, config.APP_SECRET_KEY);
        return verifiedPayload;
    } catch (error) {
        throw new Error (error);
    }
}
