package Day1;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Solution {

	private static final int DIAL_SIZE = 100;

	public static void main( String[] args ) throws IOException {

		List<String> lines = Files.readAllLines( Paths.get( "src/2025/Day1/input.txt" ) );

		int currentDialPosition = 50;
		int stoppedAtZeroCount = 0;
		int passedZeroCount = 0;

		for ( final String line : lines ) {
			final int clicks = parseClicks( line );

			final int dialFullRotations = Math.abs( clicks ) / DIAL_SIZE;
			passedZeroCount += dialFullRotations;

			final int remainingClicks = clicks % DIAL_SIZE;
			final int dialRawValue = currentDialPosition + remainingClicks;

			// Check if we pass zero after the remaining clicks (going right | going left)
			if ( dialRawValue >= DIAL_SIZE || ( currentDialPosition != 0 && dialRawValue <= 0 ) ) {
				passedZeroCount++;
			}

			currentDialPosition = ( dialRawValue % DIAL_SIZE + DIAL_SIZE ) % DIAL_SIZE;
			if ( currentDialPosition == 0 ) {
				stoppedAtZeroCount++;
			}
		}

		System.out.printf( "Part A: %d%n", stoppedAtZeroCount );
		System.out.printf( "Part B: %d%n", passedZeroCount );
	}

	private static int parseClicks( final String line ) {
		final char direction = line.charAt( 0 );
		int clicks = Integer.parseInt( line.substring( 1 ) );
		return direction == 'L' ? -clicks : clicks;
	}
}
