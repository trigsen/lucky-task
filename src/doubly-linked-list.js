class DoublyLinkedListNode {
    #next = null
    #prev = null
    #domNode = null

    constructor(value) {
        this.domNode = document.createElement('p')
        this.domNode.textContent = value
    }

    set next(nextElement) {
        this.#next = nextElement
    }

    get domNode() {
        return this.#domNode
    }

    set domNode(node) {
        this.#domNode = node
    }

    get next() {
        return this.#next
    }

    set prev(nextElement) {
        this.#prev = nextElement
    }

    get prev() {
        return this.#prev
    }
}
export class DoublyLinkedList {
    #head = null
    #tail = null
    constructor(array) {
        array.forEach((number) => {
            const node = new DoublyLinkedListNode(number)
            node.prev = this.#tail ?? null

            if (this.#tail) {
                this.#tail.next = node
            }

            if (!this.#head) {
                this.#head = node
            }

            this.#tail = node
        })
    }

    moveTailElementToHead() {
        const tailTmp = this.#tail

        this.#tail = this.#tail.prev
        this.#tail.next = null

        tailTmp.prev = null
        tailTmp.next = this.#head

        this.#head.prev = tailTmp
        this.#head = tailTmp
    }

    forEach(callback) {
        let next = this.#head

        while (next !== null) {
            callback(next)
            next = next.next
        }
    }

    get head() {
        return this.#head
    }
}