package Day3;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Solution {

	public static void main( String[] args ) throws IOException {

		List<String> banks = Files.readAllLines( Paths.get( "src/2025/Day3/input.txt" ) );

		long totalJoltagePartA = 0;
		long totalJoltagePartB = 0;

		for ( String bank : banks ) {
			totalJoltagePartA += geBankMaxJoltage( bank, 2 );
			totalJoltagePartB += geBankMaxJoltage( bank, 12 );
		}

		System.out.printf( "Part A: %d%n", totalJoltagePartA );
		System.out.printf( "Part B: %d%n", totalJoltagePartB );
	}

	private static long geBankMaxJoltage( final String bankDigits, final int numBatteries ) {
		final StringBuilder bestCombination = new StringBuilder();

		int nextSearchStartIdx = 0;
		for ( int i = 0; i < numBatteries; i++ ) {
			final int digitsRemaining = numBatteries - i;
			final int searchEndIdx = bankDigits.length() - digitsRemaining;

			final int largestDigitIdx = findIndexOfLargestDigit( bankDigits, nextSearchStartIdx, searchEndIdx );

			bestCombination.append( bankDigits.charAt( largestDigitIdx ) );
			nextSearchStartIdx = largestDigitIdx + 1;
		}

		return Long.parseLong( bestCombination.toString() );
	}

	private static int findIndexOfLargestDigit( final String bankDigits, final int start, final int end ) {
		int maxDigitIdx = start;
		char maxDigit = bankDigits.charAt( start );

		for ( int i = start + 1; i <= end; i++ ) {
			final char currentDigit = bankDigits.charAt( i );
			if ( currentDigit > maxDigit ) {
				maxDigit = currentDigit;
				maxDigitIdx = i;

				if ( maxDigit == '9' ) { // Early exit - can't do better than 9
					break;
				}
			}
		}
		return maxDigitIdx;
	}

}
