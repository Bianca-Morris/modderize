import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
	WithFieldValue
} from "firebase/firestore";
import { Game, ModRequest, UserDoc } from "../types/docTypes";

/**
 * Methods used to add and remove IDs from various item types
 * https://github.com/csfrequency/react-firebase-hooks/tree/master/firestore#transforming-data
 */

export const gameConverter: FirestoreDataConverter<Game> = {
	toFirestore(game: WithFieldValue<Game>): DocumentData {
		return {
			creatorId: game.creatorId,
			displayName: game.displayName,
			numberOfPlayers: game.numberOfPlayers,
			createdAt: game.createdAt,
			imageURL: game.imageURL
		};
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Game {
		const data = snapshot.data(options);
		const { id, ref } = snapshot;
		return {
			id,
			docRef: ref,
			creatorId: data.creatorId,
			displayName: data.displayName,
			numberOfPlayers: data.numberOfPlayers,
			createdAt: data.createdAt,
			imageURL: data.imageURL
		};
	}
};

export const modRequestConverter: FirestoreDataConverter<ModRequest> = {
	toFirestore(modRequest: WithFieldValue<ModRequest>): DocumentData {
		return {
			gameID: modRequest.gameID,
			gameDisplayName: modRequest.gameDisplayName,
			title: modRequest.title,
			description: modRequest.description,
			creationDate: modRequest.creationDate,
			requesterID: modRequest.requesterID,
			requesterDisplayName: modRequest.requesterDisplayName,
			lastModified: modRequest.lastModified,
			completionStatus: modRequest.completionStatus,
			modderStatus: modRequest.modderStatus,
			modderID: modRequest.modderID,
			voteStatus: modRequest.voteStatus,
			imageURL: modRequest.imageURL
		};
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): ModRequest {
		const data = snapshot.data(options);
		const { id, ref } = snapshot;
		const {
			gameID,
			gameDisplayName,
			title,
			description,
			creationDate,
			requesterID,
			requesterDisplayName,
			lastModified,
			completionStatus,
			modderStatus,
			modderID,
			voteStatus,
			imageURL
		} = data || {};
		return {
			id,
			docRef: ref,
			gameID,
			gameDisplayName,
			title,
			description,
			creationDate,
			requesterID,
			requesterDisplayName,
			lastModified,
			completionStatus,
			modderStatus,
			modderID,
			voteStatus,
			imageURL
		};
	}
};

// export const userConverter: FirestoreDataConverter<UserDoc> = {
// 	toFirestore(userDoc: WithFieldValue<UserDoc>): DocumentData {
// 		return {

// 		};
// 	},
// 	fromFirestore(
// 		snapshot: QueryDocumentSnapshot,
// 		options: SnapshotOptions
// 	): UserDoc {
// 		const data = snapshot.data(options);
// 		const { id } = snapshot;
// 		const { uid, creatorID, isAdmin, isActiveModder,  } = data;
// 		return {
// 			uid,
// 			isAdmin,
// 			isActiveModder
// 			// creatorID,

// 		};
// 	}
// };
