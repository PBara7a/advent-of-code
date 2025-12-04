package Day4;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class Solution {

	private static final String ROLL_SYMBOL = "@";
	private static final String REMOVED_SYMBOL = "X";
	private static List<List<String>> diagram;

	public static void main( String[] args ) throws IOException {

		diagram = Files.readAllLines( Paths.get( "src/2025/Day4/input.txt" ) )
				.stream()
				.map( line -> Arrays.asList( line.split( "" ) ) )
				.toList();

		final int accessibleRollCount = countAccessibleRolls();
		final int removedRollCount = removeAndCountAllAccessibleRolls();

		System.out.printf( "Part A: %d%n", accessibleRollCount );
		System.out.printf( "Part B: %d%n", removedRollCount );
	}

	private static int countAccessibleRolls() {
		int accessibleRollCount = 0;
		for ( int row = 0; row < diagram.size(); row++ ) {
			for ( int col = 0; col < diagram.getFirst().size(); col++ ) {

				if ( isARoll( row, col ) && countAdjacentRolls( row, col ) < 4 ) {
					accessibleRollCount++;
				}
			}
		}
		return accessibleRollCount;
	}

	private static int countAdjacentRolls( final int curRow, final int curCol ) {
		int adjacentRollCount = 0;
		for ( int rowOffset = -1; rowOffset <= 1; rowOffset++ ) {
			for ( int colOffset = -1; colOffset <= 1; colOffset++ ) {

				if ( rowOffset == 0 && colOffset == 0 ) {
					continue;
				}

				final int adjacentRow = curRow + rowOffset;
				final int adjacentCol = curCol + colOffset;

				if ( isWithinBounds( adjacentRow, adjacentCol ) && isARoll( adjacentRow, adjacentCol ) ) {
					adjacentRollCount++;
				}
			}
		}
		return adjacentRollCount;
	}

	private static int removeAndCountAllAccessibleRolls() {
		int removedRollCount = 0;
		while ( true ) {
			final int removedThisPass = removeAndCountAccessibleRollsOnce();

			if ( removedThisPass == 0 ) {
				break;
			}
			removedRollCount += removedThisPass;
		}
		return removedRollCount;
	}

	private static int removeAndCountAccessibleRollsOnce() {
		int removedRollCount = 0;
		for ( int row = 0; row < diagram.size(); row++ ) {
			for ( int col = 0; col < diagram.getFirst().size(); col++ ) {
				if ( isARoll( row, col ) && countAdjacentRolls( row, col ) < 4 ) {
					diagram.get( row ).set( col, REMOVED_SYMBOL );
					removedRollCount++;
				}
			}
		}
		return removedRollCount;
	}

	private static boolean isARoll( final int row, final int col ) {
		return diagram.get( row ).get( col ).equals( ROLL_SYMBOL );
	}

	private static boolean isWithinBounds( final int row, final int col ) {
		return row >= 0 && row < diagram.size() && col >= 0 && col < diagram.getFirst().size();
	}

}
