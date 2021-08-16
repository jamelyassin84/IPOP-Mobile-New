<View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Males </Text>
                    <BarChart
                        data={chartdataMale}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( '#49BDD7' )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Females </Text>
                    <BarChart
                        data={chartdataFemale}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( '#EF7896' )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Total </Text>
                    <BarChart
                        data={chartdataTotal}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( 'orange' )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>