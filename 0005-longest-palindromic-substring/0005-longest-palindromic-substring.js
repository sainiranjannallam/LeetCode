/**
 * Function: longestPalindrome
 * ---------------------------
 * Given a string s, return the longest palindromic substring inside it.
 * 
 * We use the Expand Around Center approach.
 */

function longestPalindrome(s) {
    // ---------------------------------------------------------------
    // Edge Case: If the string length is 0 or 1, the answer is s itself.
    // A single character is trivially a palindrome.
    // ---------------------------------------------------------------
    if (s.length <= 1) {
        return s;
    }

    // ---------------------------------------------------------------
    // Variables to store the final longest palindrome boundaries:
    // "start" = starting index of longest palindrome found so far
    // "end"   = ending index of longest palindrome found so far
    //
    // We initialize them at 0 so the smallest valid palindrome is the first character.
    // ---------------------------------------------------------------
    let start = 0;
    let end = 0;

    // ---------------------------------------------------------------
    // Helper Function: expandAroundCenter(left, right)
    // ---------------------------------------------------------------
    // This function receives two indices:
    //   - left index  → the left side of the potential palindrome center
    //   - right index → the right side of the potential palindrome center
    //
    // For odd-length palindromes, left == right (center on a character)
    // For even-length palindromes, right == left + 1 (center between characters)
    //
    // It expands outward as long as:
    //   1) left stays in bounds
    //   2) right stays in bounds
    //   3) s[left] === s[right]
    //
    // When expansion stops, the valid palindrome boundaries are (left+1) to (right-1)
    //
    // Returns: the length of the palindrome formed.
    // ---------------------------------------------------------------
    function expandAroundCenter(left, right) {
        // Expand while characters match and indices stay in bounds.
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;   // move left pointer outward to the left
            right++;  // move right pointer outward to the right
        }

        // IMPORTANT:
        // When we exit the loop, left and right are one position BEYOND
        // the last matching characters.
        // Example:
        //     Valid palindrome:   "racecar"
        //     Expanded to indexes: L= -1, R= 7 (invalid indexes)
        // So the actual palindrome is between (left+1) and (right-1)

        // Right - left - 1 gives the exact palindrome length.
        return right - left - 1;
    }

    // ---------------------------------------------------------------
    // MAIN LOOP: Iterate through every character of the string.
    //
    // For each index i:
    //   - Check for longest odd-length palindrome centered at i
    //   - Check for longest even-length palindrome centered at i and i+1
    //
    // Then compare and update the global longest (start, end) if needed.
    // ---------------------------------------------------------------
    for (let i = 0; i < s.length; i++) {
        // Expand around the "i" index → odd length palindrome.
        let len1 = expandAroundCenter(i, i);

        // Expand around the "i" and "i+1" index → even length palindrome.
        let len2 = expandAroundCenter(i, i + 1);

        // Determine which of the two expansions produced the longer palindrome.
        let longestLenOfThisPosition = Math.max(len1, len2);

        // ---------------------------------------------------------------
        // Now calculate the new potential boundaries:
        //
        // If longest length = L:
        //    start index = i - (L - 1) / 2
        //    end index   = i + L / 2
        //
        // These formulas come from analyzing how odd/even centers expand.
        // They work for both odd and even palindrome lengths.
        // ---------------------------------------------------------------
        if (longestLenOfThisPosition > end - start) {
            start = i - Math.floor((longestLenOfThisPosition - 1) / 2);
            end = i + Math.floor(longestLenOfThisPosition / 2);
        }
    }

    // ---------------------------------------------------------------
    // After finishing expansions for all centers,
    // the longest palindrome substring is the slice from start to end.
    // slice(start, end+1) → because slice end is exclusive
    // ---------------------------------------------------------------
    return s.slice(start, end + 1);
}
