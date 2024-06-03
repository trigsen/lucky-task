import { Signal } from "signal-polyfill";
import { effect } from './src/signal-effect'
import { DoublyLinkedList } from './src/doubly-linked-list'

const NUMBERS_SEQUENCE = new Array(10).fill(0).map((_, i) => i + 1)
const INTERVAL_TIMER = 500

const doublyLinkedList = new DoublyLinkedList(NUMBERS_SEQUENCE)

const topElementOfSequence = new Signal.State(doublyLinkedList.head)

const appContainer = document.getElementById('app')

const createHtmlElements = () => {
    doublyLinkedList.forEach((node) => {
        appContainer.appendChild(node.domNode)
    })
}

createHtmlElements()

effect(() => {
    const headNode = topElementOfSequence.get()

    if (headNode.next) {
        appContainer.insertBefore(headNode.domNode, headNode.next.domNode)
    }
})


setInterval(() => {
    doublyLinkedList.moveTailElementToHead()
    topElementOfSequence.set(doublyLinkedList.head)
}, INTERVAL_TIMER)