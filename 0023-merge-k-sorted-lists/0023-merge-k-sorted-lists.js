var mergeKLists = function(lists) {

    // Define MinHeap INSIDE the function (unique per call)
    class MinHeap {
        constructor() { this.heap = []; }
        swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]] }
        push(node) { this.heap.push(node); this.bubbleUp(this.heap.length - 1); }
        bubbleUp(i) {
            let parent = Math.floor((i - 1) / 2);
            while (i > 0 && this.heap[i].val < this.heap[parent].val) {
                this.swap(i, parent);
                i = parent;
                parent = Math.floor((i - 1) / 2);
            }
        }
        pop() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            const root = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown(0);
            return root;
        }
        bubbleDown(i) {
            const n = this.heap.length;
            while (true) {
                let smallest = i;
                let left = 2 * i + 1;
                let right = 2 * i + 2;
                if (left < n && this.heap[left].val < this.heap[smallest].val) smallest = left;
                if (right < n && this.heap[right].val < this.heap[smallest].val) smallest = right;
                if (smallest === i) break;
                this.swap(i, smallest);
                i = smallest;
            }
        }
        isEmpty() { return this.heap.length === 0; }
    }

    // ---- original merging code ----
    const minHeap = new MinHeap();
    for (let head of lists) {
        if (head) minHeap.push(head);
    }

    let dummy = new ListNode(-1);
    let current = dummy;

    while (!minHeap.isEmpty()) {
        const node = minHeap.pop();
        current.next = node;
        current = current.next;

        if (node.next) minHeap.push(node.next);
    }

    return dummy.next;
};
