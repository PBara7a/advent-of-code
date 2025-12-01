package Day1;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Solution {

	public static void main( String[] args ) throws IOException {

		List<String> lines = Files.readAllLines( Paths.get( "src/2025/Day1/input.txt" ) );

		int currentDialPosition = 50;
		int stoppedAtZeroCount = 0;
		int passedZeroCount = 0;

		for ( final String line : lines ) {
			final char direction = line.charAt( 0 );
			final int clicks = Integer.parseInt( line.substring( 1 ) );

			final int dialMovement = switch ( direction ) {
				case 'L' -> -clicks;
				case 'R' -> clicks;
				default -> throw new IllegalArgumentException( "Invalid direction: " + direction );
			};

			final int dialFullRotations = Math.abs( dialMovement ) / 100;
			passedZeroCount += dialFullRotations;

			final int remainingDialMovement = dialMovement % 100;
			final int dialRawValue = currentDialPosition + remainingDialMovement;

			if ( dialRawValue >= 100 ) { // Check if we pass zero turning the dial right
				passedZeroCount++;
			} else if ( currentDialPosition != 0 && dialRawValue <= 0 ) { // Check if we pass zero turning the dial left
				passedZeroCount++;
			}

			currentDialPosition = ( dialRawValue % 100 + 100 ) % 100;
			if ( currentDialPosition == 0 ) {
				stoppedAtZeroCount++;
			}
		}

		System.out.printf( "Part A: %d%n", stoppedAtZeroCount );
		System.out.printf( "Part B: %d%n", passedZeroCount );
	}
}
