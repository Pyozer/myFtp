export class Messages {
    messages: Message[]

    constructor(messages: Message[]) {
        this.messages = messages
    }

    getMsg(status: number) {
        let msg = this.messages.find((m) => m.status == status);
        if (!msg) return null;
        return msg.message
    }
}

export class Message {
    status: number
    message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }
}
