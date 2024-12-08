package Day3;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Solution {

	private static final String regex = "mul\\((\\d{1,3}),(\\d{1,3})\\)|(do\\(\\))|(don't\\(\\))";
	private static final Pattern pattern = Pattern.compile( regex );

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day3/input.txt") );

		System.out.printf( "Part A: %d%n", multiplyAndSumOperators( extractOperators( lines, false ) ) );
		System.out.printf( "Part B: %d%n", multiplyAndSumOperators( extractOperators( lines, true ) ) );
	}

	private static List<List<Integer>> extractOperators( List<String> lines, boolean enableSwitch ) {
		boolean enabled = true;
		List<List<Integer>> operators = new ArrayList<>();

		for ( String line : lines ) {
			Matcher matcher = pattern.matcher( line );

			while ( matcher.find() ) {
				String match = matcher.group();

				if ( !enableSwitch && (match.equals("do()") || match.equals("don't()")) ) {
					continue;
				}

				if ( match.equals( "do()" ) ) {
					enabled = true;
				} else if ( match.equals( "don't()" ) ) {
					enabled = false;
				} else if ( enabled ) {
					operators.add( List.of(
							Integer.parseInt(matcher.group(1)), Integer.parseInt(matcher.group(2))
					) );
				}
			}
		}

		return operators;
	}

	private static int multiplyAndSumOperators( List<List<Integer>> operators ) {
		return operators.stream()
				.mapToInt( opPair -> opPair.get(0) * opPair.get(1) )
				.sum();
	}
}
