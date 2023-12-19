const apiBase = 'https://api-cf.dtkt.ua/';

export class CommentsApi {
    id: Number;

    constructor(id: number) {
        this.id = id;
    }

    fetchComments(params: object) {
        const url = new URL(`/comments/${this.id}/comments?json=1`, apiBase);

        Object.entries(params).forEach(([key, value]) => value === void 0 || url.searchParams.append(key, value));

        return fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json();
            });
    };

    createComment(comment: object) {
        const url = new URL(`/comments/${this.id}/comments`, apiBase);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(comment),
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        });
    }

    loadReplies(id: number) {
        const url = new URL(`/comments/${this.id}/comments?json=1&parent_id=${id}`, apiBase);

        return fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}
