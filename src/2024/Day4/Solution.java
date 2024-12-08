package Day4;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Solution {

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day4/input.txt") );

		List<List<String>> letterBoard = createLetterBoard( lines );

		System.out.printf( "Part A: %d%n",  countXmas( letterBoard ) );
		System.out.printf( "Part B: %d%n",  countCrossedMas( letterBoard ) );
	}

	private static List<List<String>> createLetterBoard( List<String> lines ) {
		return lines.stream()
				.map( line -> List.of( line.split( "" ) ) )
				.collect( Collectors.toList() );
	}

	private static int checkWord( List<List<String>> letterBoard, int startRow, int startCol, int rowDelta, int colDelta ) {
		StringBuilder word = new StringBuilder();
		for ( int i = 0; i < 4; i++ ) {
			int curRow = startRow + i * rowDelta;
			int curCol = startCol + i * colDelta;
			word.append( letterBoard.get(curRow).get(curCol) );
		}
		return word.toString().equals( "XMAS" ) ? 1 : 0;
	}

	private static int countXmas( List<List<String>> letterBoard ) {
		int boardHeight = letterBoard.size();
		int boardWidth = letterBoard.getFirst().size();
		int count = 0;

		for ( int row = 0; row < boardHeight; row++ ) {
			for ( int col = 0; col < boardWidth; col++ ) {

				// Check right
				if ( col <= boardWidth - 4 ) {
					count += checkWord( letterBoard, row, col, 0, 1 );
				}

				// Check right-up diagonal
				if ( col <= boardWidth - 4 && row >= 3 ) {
					count += checkWord( letterBoard, row, col, -1, 1 );
				}

				// Check right-down diagonal
				if ( col <= boardWidth - 4 && row <= boardHeight - 4 ) {
					count += checkWord( letterBoard, row, col, 1, 1 );
				}

				// Check down
				if ( row <= boardHeight - 4 ) {
					count += checkWord( letterBoard, row, col, 1, 0 );
				}

				// Check left
				if ( col >= 3 ) {
					count += checkWord( letterBoard, row, col, 0, -1 );
				}

				// Check left-up diagonal
				if ( col >= 3 && row >= 3 ) {
					count += checkWord( letterBoard, row, col, -1, -1 );
				}

				// Check left-down diagonal
				if ( col >= 3 && row <= boardHeight - 4 ) {
					count += checkWord( letterBoard, row, col, 1, -1 );
				}

				// Check up
				if ( row >= 3 ) {
					count += checkWord( letterBoard, row, col, -1, 0 );
				}
			}
		}
		return count;
	}

	private static int countCrossedMas( List<List<String>> letterBoard ) {
		Set<String> validConfigurations = new HashSet<>();
		validConfigurations.add("MSMS");
		validConfigurations.add("MMSS");
		validConfigurations.add("SMSM");
		validConfigurations.add("SSMM");

		int count = 0;

		for ( int row = 1; row < letterBoard.size() - 1; row++ ) {
			for ( int col = 1; col < letterBoard.getFirst().size() - 1; col++ ) {
				StringBuilder currentConfiguration = new StringBuilder();

				if ( letterBoard.get( row ).get( col ).equals( "A" ) ) {
					currentConfiguration.append( letterBoard.get( row - 1 ).get( col - 1 ) );
					currentConfiguration.append( letterBoard.get( row - 1 ).get( col + 1 ) );
					currentConfiguration.append( letterBoard.get( row + 1 ).get( col - 1 ) );
					currentConfiguration.append( letterBoard.get( row + 1 ).get( col + 1 ) );
					if ( validConfigurations.contains( currentConfiguration.toString() ) ) {
						count++;
					}
				}
			}
		}
		return count;
	}
}
